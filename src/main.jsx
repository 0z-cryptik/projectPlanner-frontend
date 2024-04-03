import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedApp } from "./routes.jsx";
import { StateProvider } from "./hooks/stateProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <Router>
        <RoutedApp />
      </Router>
    </StateProvider>
  </React.StrictMode>
);
