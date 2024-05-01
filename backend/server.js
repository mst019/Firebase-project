express = require("express");
cors = require("cors");
const Product = require("./config/firestore-config");
const Redis = require("redis");
const jwt = require("jsonwebtoken");

const decodeToken = require("./middleware/tokenVerification");

PORT = 3000;
const DEFAULT_EXPIRATION = 3600;
const secret = "txrsplkg1234@QsdASXdfSRV094";

const redisClient = Redis.createClient();
redisClient.connect();

const app = express();

app.use(express.json());
app.use(cors());

//login endpoint

app.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;

    const jwtToken = jwt.sign({ email }, secret, {
      expiresIn: "1m",
    });

    res.cookie("token", jwtToken, { httpOnly: true });
    console.log("login successfully...");
    res.send(jwtToken);
  } catch (err) {
    return res.send("login error");
  }
});

//verification endpoint
app.use(decodeToken);

//CRUD

app.get("/", async (req, res) => {
  try {
    const products = await redisClient.get("products");

    if (products) {
      console.log("cache hit");

      return res.status(200).send(JSON.parse(products));
    } else {
      console.log("cache miss");
      const products = await Product.get();

      const listProducts = products.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      redisClient.setEx(
        "products",
        DEFAULT_EXPIRATION,
        JSON.stringify(listProducts)
      );

      return res.status(200).send(listProducts);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("internal server error");
  }
});

app.post("/add", async (req, res) => {
  try {
    const newProduct = req.body;

    const { id } = await Product.add(newProduct);

    const products = await redisClient.get("products");
    if (products) {
      listProducts = JSON.parse(products);

      listProducts.push({ id, ...newProduct });
      redisClient.setEx(
        "products",
        DEFAULT_EXPIRATION,
        JSON.stringify(listProducts)
      );
    }
    return res.status(200).send("Product added successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await Product.doc(id).update(data);

    const products = await redisClient.get("products");
    if (products) {
      listProducts = JSON.parse(products);
      const productIndex = listProducts.findIndex((prod) => prod.id === id);

      listProducts[productIndex] = { id, ...data };
      redisClient.setEx(
        "products",
        DEFAULT_EXPIRATION,
        JSON.stringify(listProducts)
      );
    }

    return res.status(200).send("Product updated successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.doc(id).delete();

    const products = await redisClient.get("products");
    if (products) {
      listProducts = JSON.parse(products);

      const newListProducts = listProducts.filter((prod) => prod.id != id);
      redisClient.setEx(
        "products",
        DEFAULT_EXPIRATION,
        JSON.stringify(newListProducts)
      );
    }

    return res.status(200).send("Product deleted successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}...`);
});
