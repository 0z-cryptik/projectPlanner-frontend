import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router";

function App() {
  useEffect(() => {
    loginStateCheck();
  }, []);

  const loginStateCheck = async () => {
    const navigate = useNavigate();
    const res = await fetch("/api/check");
    const response = await res.json();
    console.log(response);
    if (response.locals.loggedIn) {
    } else {
      navigate("/login");
    }
  };

  return <p className="bg-black text-white">Brazyy</p>;
}

export default App;
