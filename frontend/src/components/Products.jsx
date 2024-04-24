import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import Product from "./Product";
import "./styles/products.css";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newAvailable, setNewAvailable] = useState(false);

  const addProduct = async () => {
    try {
      const newProduct = {
        name: newName,
        price: newPrice,
        available: newAvailable,
      };
      await axios.post("http://localhost:3000/add", newProduct, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log("product added successfully...");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const signingOut = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("token");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = (token) => {
      axios
        .get("http://localhost:3000/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setProducts(res.data);
          console.log("list:", res.data);
          console.log(products.length);
        })
        .catch((err) => console.log(err));
    };
    if (token) {
      fetchData(token);
    }
  }, []);
  return (
    <div>
      <div className="products-container">
        {!(products.length === 0) ? (
          products.map((product) => <Product product={product} token={token} />)
        ) : (
          <h2>No products available</h2>
        )}
      </div>
      <div className="new-product-section">
        <h1>Add New Product:</h1>
        <div className="new-product-card">
          <h2>New Product</h2>
          <input
            type="text"
            placeholder="Insert Name..."
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Insert Price..."
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <label>Available?</label>
          <input
            type="checkbox"
            checked={newAvailable}
            onChange={(e) => setNewAvailable(e.target.checked)}
          />
          <button className="btn" onClick={addProduct}>
            Add
          </button>
        </div>
      </div>

      <div className="sign-out-section">
        <button className="login-btn" onClick={signingOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Products;
