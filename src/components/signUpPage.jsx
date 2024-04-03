import { useState } from "react";
import { useNavigate } from "react-router";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const navigate = useNavigate();
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
        navigate("/name");
      }
    } catch (err) {
      console.error(err);
      console.log("it's an error");
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
          id="submit"
          type="submit"
          value="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
};
