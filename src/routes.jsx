import { Route, Routes } from "react-router";
import { SignUpPage } from "./components/signup/signUpPage";
import { LoginPage } from "./components/login/loginPage";
import { Homepage } from "./components/homepage/homepage";
import { LandingPage } from "./components/landingPage/landingPage";

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
    </Routes>
  );
};
