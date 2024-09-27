import { useState } from "react";
import { useList } from "../../hooks/stateProvider";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "./passwordField";
import { Oval } from "react-loader-spinner";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { setUser, setProjects, server } = useList();

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      email: form.get("email"),
      password: form.get("password")
    };

    try {
      setShowLoader(true);
      const loginRes = await fetch(`${server}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      const loginResponse = await loginRes.json();

      setUser(loginResponse.user);
      setProjects(loginResponse.user.projects.reverse());
      navigate("/workspace");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <main className="lg:h-screen lg:w-1/2 flex flex-col items-center justify-center py-2 my-auto order-2 lg:order-1">
      <h1 className="text-4xl max-lg:w-[60%] lg:text-xl font-semibold lg:font-bold">
        Sign In
      </h1>
      <form
        className="flex flex-col w-[65%] max-lg:mt-[2.5rem]"
        onSubmit={submitHandler}>
        <label
          className="mb-2 font-extralight"
          htmlFor="email">
          Email Address
        </label>
        <input
          className="border mb-3 rounded h-[2.8rem] px-2 text-sm max-lg:outline-[#f7c2dc] lg:border-[#73bfd9] lg:outline-none"
          name="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          required
        />
        <label
          className="mb-2 font-extralight"
          htmlFor="password">
          Password
        </label>
        <PasswordField />
        <button
          className="bg-[#df5569] lg:hover:bg-[#73bfd9] lg:bg-[#23446f] text-white h-[2.8rem] rounded flex justify-center items-center"
          type="submit"
          value="submit"
          disabled={showLoader ? true : false}>
          {showLoader ? (
            <Oval
              color="black"
              secondaryColor="white"
              width={"2rem"}
            />
          ) : (
            "Login"
          )}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-3">Wrong email or password</p>
      )}
      <p className="mt-5 text-sm">
        Don't have an account yet?{" "}
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="text-[#df5569] lg:text-[#1a8fc4]">
          Sign up
        </button>
      </p>
    </main>
  );
};
