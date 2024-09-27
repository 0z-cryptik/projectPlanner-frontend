import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StateProvider } from "./hooks/stateProvider.jsx";
import { SignUpPage } from "./components/signup/signUpPage";
import { LoginPage } from "./components/login/loginPage";
import { Homepage } from "./components/homepage/homepage";
import { LandingPage } from "./components/landingPage/landingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/workspace",
    element: <Homepage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={router} />
    </StateProvider>
  </React.StrictMode>
);
