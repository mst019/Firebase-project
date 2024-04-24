import { useEffect, useState } from "react";
import Login from "./components/Login";
import { auth } from "./config/firebase";
import Products from "./components/Products";
import "./App.css";

function App() {
  // const [authStatus, setAuthStatus] = useState(!(auth?.currentUser == null));
  const [authStatus, setAuthStatus] = useState(
    false || window.localStorage.getItem("auth")
  );

  const [token, setToken] = useState(
    "" || window.localStorage.getItem("token")
  );

  useEffect(() => {
    console.log("auth status:" + authStatus);
    console.log("token:" + token);
    console.log("auth email:" + auth?.currentUser?.email);
  }, [authStatus]);
  return (
    <>
      {!authStatus ? (
        <Login
          setToken={setToken}
          setAuthStatus={setAuthStatus}
          authStatus={authStatus}
        />
      ) : (
        <Products token={token} />
      )}
    </>
  );
}

export default App;
