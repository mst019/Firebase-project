import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import "./styles/login.css";

const Login = ({ setToken, setAuthStatus, authstatus }) => {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser) {
        const tokenvalue = await auth?.currentUser?.getIdToken();

        if (tokenvalue) {
          setAuthStatus(true);
          console.log("status:" + authstatus);
          window.localStorage.setItem("auth", true);
          setToken(tokenvalue);
          window.localStorage.setItem("token", tokenvalue);
        }
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
