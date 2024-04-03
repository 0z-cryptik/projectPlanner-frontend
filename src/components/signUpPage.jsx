import { useState } from "react";
import { useNavigate } from "react-router";
import { useList } from "../hooks/stateProvider";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setSignUpUser } = useList();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data2submit = {
      email: form.get("email"),
      password: form.get("password")
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      console.log(response);
      if (response.success) {
        setSignUpUser(response.data);
        navigate("/enterName");
      } else if (!response.success) {
        setError(true);
        setErrorMsg(response.reason);
      }
    } catch (err) {
      console.error(err);
      console.log("it's an error");
      setError(true);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Sign Up</h1>
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
          type="submit"
          value="submit">
          Sign Up
        </button>
      </form>
      {error && errorMsg && <p>{errorMsg}</p>}
      {error && (
        <p>unexpected error, please refresh the page and try again</p>
      )}
    </main>
  );
};
