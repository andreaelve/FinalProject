import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0();

  const addUserEmail = () => {
    fetch("http://localhost:3001/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.email,
      }),
    });
  };

  return (
    <button
      onClick={() => {
        loginWithRedirect();
        addUserEmail();
        console.log("rrrr",user.email);
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
