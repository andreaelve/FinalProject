import React, { useEffect, useState } from "react";
import "./App.css";
import Swiper from "./components/Swiper";
import Login from "./components/login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/logoutbutton";

function App() {
  const { isAuthenticated, user } = useAuth0();

  // Should fetch information about user here, or initialise information about the user

  if (!isAuthenticated) {
    return (
      <div className="App">
        <header className="App-header">
          <Login />
        </header>
      </div>
    );
  }

  module.exports = function (user, context, cb) {
    // Perform any asynchronous actions, such as send notification to Slack.
    cb();
  };



  useEffect(() => {
    addUserEmail();
    console.log("ghgh", user);
  }, [user]);

  const addUserEmail = () => {
    fetch("http://localhost:3001/register", {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.email,
      }),
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <LogoutButton />
        <Swiper />
      </header>
    </div>
  );
}

export default App;
