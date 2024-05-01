import { useEffect, useState } from "react";
import Login from "./components/Login";
import { auth } from "./config/firebase";
import Products from "./components/Products";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const authStatus = false || window.localStorage.getItem("auth");

  return (
    <Routes>
      <Route
        path="/"
        element={
          authStatus ? <Navigate to="/products" /> : <Navigate to="/login" />
        }
      />

      <Route element={<Login />} path="/login" />

      <Route element={<Products />} path="/products" />
    </Routes>
  );
}

export default App;
