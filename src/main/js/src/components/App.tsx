import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import StartZookeeper from "./StartZookeeper";
import Main from "./Main";

export const App = () => {
  // State hook for Zookeeper server status
  const [status, setStatus] = useState("");

  // Sends GET request when app initializes to receive status on Zookeeper server
  useEffect(() => {
    fetch("/checkStatus")
      .then((res) => res.text())
      // .then(() => console.log("starting server"))
      .then((status) => setStatus(status))
      .catch((err) => {
        console.log("erorrroror <3 mmmmm", err);
      });
  });

  if (status === "Offline") {
    return (
      <div>
        <StartZookeeper />
      </div>
    );
  } else if (status === "Online") {
    return (
      <div>
        <Main />
      </div>
    );
  } else {
    // Can add loading bar
    return (
      <div>
        <h1>THIS WILL BE A NAV BAR</h1>
      </div>
    );
  }
};
