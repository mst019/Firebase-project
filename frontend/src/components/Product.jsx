import React, { useState } from "react";
import axios from "axios";
import "./styles/product.css";

const Product = ({ product, token }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const updateProduct = async () => {
    try {
      const productUpdated = { name, price, available };
      await axios.put(
        `http://localhost:3000/update/${product.id}`,
        productUpdated,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log("product updated successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete/${product.id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log("product deleted successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="product-container">
      <div className="product-card">
        <h2>{product.name}</h2>
        <p>{product.price} DT</p>
        <p>
          {product.available ? (
            <p style={{ color: "green" }}>Available</p>
          ) : (
            <p style={{ color: "red" }}>Not Available</p>
          )}
        </p>
      </div>
      <div className="product-update">
        <h3>Update Section:</h3>
        <input
          type="text"
          placeholder="Insert New Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Insert New Price..."
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Available?</label>
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />

        <button className="btn" onClick={updateProduct}>
          Update
        </button>
      </div>

      <div className="product-delete">
        <button className="btn" onClick={deleteProduct}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
