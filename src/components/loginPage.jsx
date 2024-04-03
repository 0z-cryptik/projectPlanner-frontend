import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Login</h1>
      <form className="flex flex-col border w-[25%] p-5">
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
        Don't have an account yet? <a href="/signup">Sign Up</a>
      </p>
    </main>
  );
};
