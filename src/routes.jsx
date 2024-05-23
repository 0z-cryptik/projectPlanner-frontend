import { Route, Routes } from "react-router";
import App from "./App";
import { SignUpPage } from "./components/signup/signUpPage";
import { LoginPage } from "./components/loginPage";
import { Homepage } from "./components/homepage/homepage";
import { LandingPage } from "./components/landingPage/landingPage";
import { ShadCNPage } from "./components/shadCNTest/shadCN";

export const RoutedApp = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/signup"
        element={<SignUpPage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/workspace"
        element={<Homepage />}
      />
      <Route
        path="/shadcn"
        element={<ShadCNPage />}
      />
    </Routes>
  );
};
