import { useState } from "react";
import { useNavigate } from "react-router";
import { useList } from "../../hooks/stateProvider";

export const SignUpForm = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    setProcessingUser
  } = useList();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setProcessingUser(true);

    const form = new FormData(e.target);

    const data2submit = {
      email: form.get("email"),
      password: form.get("password"),
      name: form.get("name"),
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${form.get(
        "name"
      )}`
    };

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();
      console.log(response);
      if (response.success) {
        setUser(response.data);
        setProcessingUser(false);
        navigate("/workspace");
      } else if (!response.success) {
        setProcessingUser(false);
        setError(true);
        setErrorMsg(response.reason);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setProcessingUser(false);
    }
  };

  return (
    <main className="h-screen w-1/2 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <form
        className="flex flex-col w-[65%]"
        onSubmit={submitHandler}>
        <label
          htmlFor="name"
          className="mb-2 font-extralight">
          Your name
        </label>
        <input
          className="border mb-3 rounded h-[2.8rem] px-2 text-sm outline-[#cdd6fe]"
          name="name"
          type="text"
          placeholder="Enter your name or nickname"
          required
          autoFocus
        />
        <label
          htmlFor="email"
          className="mb-2 font-extralight">
          Email Address
        </label>
        <input
          className="border mb-3 rounded h-[2.8rem] px-2 text-sm outline-[#cdd6fe]"
          name="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          required
        />
        <label
          htmlFor="password"
          className="mb-2 font-extralight">
          Password
        </label>
        <input
          className="border mb-3 rounded h-[2.8rem] px-2 text-sm outline-[#cdd6fe]"
          name="password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          required
        />
        <label
          htmlFor="confirmPassword"
          className="mb-2 font-extralight">
          Confirm password
        </label>
        <input
          className="border mb-6 rounded h-[2.8rem] px-2 text-sm outline-[#cdd6fe]"
          type="password"
          required
        />
        <button
          className="bg-[#7a82e0] hover:bg-[#cdd6fe] text-white hover:text-black h-[2.8rem] rounded"
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
