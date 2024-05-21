import { Route, Routes } from "react-router";
import App from "./App";
import { SignUpPage } from "./components/signUpPage";
import { LoginPage } from "./components/loginPage";
import { EnterName } from "./components/enterName";
import { Homepage } from "./components/homepage/homepage";
import { LandingPage } from "./components/landingPage/landingPage";
import { ShadCNPage } from "./components/shadCNTest/shadCN";

export const RoutedApp = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage />}
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
        path="/enterName"
        element={<EnterName />}
      />
      <Route
        path="/landingPage"
        element={<LandingPage />}
      />
      <Route
        path="/shadcn"
        element={<ShadCNPage />}
      />
    </Routes>
  );
};
