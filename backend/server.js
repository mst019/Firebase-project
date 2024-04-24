express = require("express");
cors = require("cors");
PORT = 3000;
const decodeToken = require("./middleware/tokenVerification");
const Product = require("./config/firestore-config");

const app = express();

app.use(express.json());
app.use(cors());

app.use(decodeToken);

app.get("/", async (req, res) => {
  try {
    const products = await Product.get();
    const listProducts = products.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).send(listProducts);
  } catch (err) {
    return res.status(500).send("internal server error");
  }
});

app.post("/add", async (req, res) => {
  try {
    const newProduct = req.body;

    await Product.add(newProduct);
    return res.status(200).send("Product added successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    console.log("start updating");
    const { id } = req.params;

    const data = req.body;
    await Product.doc(id).update(data);

    //const product = await Product.findById(id);

    return res.status(200).send("Product updated successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.doc(id).delete();
    return res.status(200).send("Product deleted successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}...`);
});
