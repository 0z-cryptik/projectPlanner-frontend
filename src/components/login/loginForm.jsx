import { useState } from "react";
import { useList } from "../../hooks/stateProvider";
import { useNavigate } from "react-router";
import { LoginError } from "../errorPages/loginError";
import { LoggingInUser } from "../loaders/loggingInUser";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser, setProjects, loggingInUser, setLoggingInUser } =
    useList();

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
        navigate("/workspace");
      } else {
        setError(true);
        setLoggingInUser(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <main className="h-screen w-1/2 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <form
        className="flex flex-col w-[65%]"
        onSubmit={submitHandler}>
        <label
          className="mb-2 font-extralight"
          htmlFor="email">
          Email Address
        </label>
        <input
          className="border mb-3 rounded h-[2.8rem] px-2 text-sm outline-[#a6a6ff]"
          name="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          required
          autoFocus
        />
        <label
          className="mb-2 font-extralight"
          htmlFor="password">
          Password
        </label>
        <input
          className="border mb-6 rounded h-[2.8rem] px-2 text-sm outline-[#a6a6ff]"
          name="password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          required
        />
        <button
          className="bg-[#a6a6ff] hover:bg-[#b8b8fe] text-white hover:text-black h-[2.8rem] rounded"
          id="submit"
          type="submit"
          value="submit">
          Login
        </button>
      </form>
      <p className="mt-5 text-sm">
        Don't have an account yet?{" "}
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="text-[#7a82e0]">
          Sign up
        </button>
      </p>
      {error && <LoginError />}
    </main>
  );
};
