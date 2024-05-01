import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import "./styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({}) => {
  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser) {
        const email = await auth?.currentUser?.email;

        const emailData = { email: email };

        const token = await axios.post(
          "http://localhost:3000/login",
          emailData
        );
        console.log("email sent successfully");

        window.localStorage.setItem("auth", true);

        window.localStorage.setItem("token", token.data);
        navigate("/products");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="login-page">
      <div className="login-section">
        <button className="login-btn" onClick={loginWithGoogle}>
          Login with google
        </button>
      </div>
    </div>
  );
};

export default Login;
