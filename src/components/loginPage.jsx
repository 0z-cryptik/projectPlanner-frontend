import { useState } from "react";
import { useList } from "../hooks/stateProvider";
import { useNavigate } from "react-router";
import { LoginError } from "./errorPages/loginError";
import { LoggingInUser } from "./loaders/loggingInUser";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingInUser, setLoggingInUser] = useState(false);
  const [error, setError] = useState(false);
  const { setUser, setProjects } = useList();

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      email: form.get("email"),
      password: form.get("password")
    };

    try {
      setLoggingInUser(true);
      const loginRes = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const loginResponse = await loginRes.json();
      console.log(loginResponse);

      if (loginResponse.user) {
        setUser(loginResponse.user);
        setProjects(loginResponse.user.projects.reverse());
        setLoggingInUser(false);
        navigate("/homepage");
      } else {
        setError(true);
        setLoggingInUser(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  if (loggingInUser) {
    return <LoggingInUser />;
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Login</h1>
      <form
        className="flex flex-col border w-[25%] p-5"
        onSubmit={submitHandler}>
        <label htmlFor="email">email:</label>
        <input
          className="border mb-3"
          name="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          id="email"
          required
          autoFocus
        />
        <label htmlFor="password">password:</label>
        <input
          className="border mb-3"
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={passwordChangeHandler}
          required
        />
        <button
          className="bg-blue-400"
          id="submit"
          type="submit"
          value="submit">
          login
        </button>
      </form>
      <p>
        Don't have an account yet?{" "}
        <a
          href="/signup"
          className="text-blue-500 underline">
          Sign Up
        </a>
      </p>
      {error && <LoginError />}
    </main>
  );
};
