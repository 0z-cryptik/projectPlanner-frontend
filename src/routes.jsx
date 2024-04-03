import { Route, Routes } from "react-router";
import App from "./App";
import { SignUpPage } from "./components/signUpPage";
import { LoginPage } from "./components/loginPage";

export const RoutedApp = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<App />}
      />
      <Route
        path="/signup"
        element={<SignUpPage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
    </Routes>
  );
};
