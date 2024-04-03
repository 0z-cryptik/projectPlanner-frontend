import { useState } from "react";
import { useNavigate } from "react-router";
import { useList } from "../hooks/stateProvider";

export const EnterName = () => {
  const [name, setName] = useState("");
  const { signUpUser } = useList();

  const navigate = useNavigate();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    try {
      const res = await fetch("/api/signup/submitName", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          userID: signUpUser._id
        }),
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <center className="w-[38%] h-fit border py-5">
        <p>Please enter your name</p>
        <form
          onSubmit={submitHandler}
          className="flex flex-col">
          <input
            className="w-[80%] border mt-5 h-[2rem]"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={nameChangeHandler}
            placeholder="Enter your name..."
            required
            autoFocus
          />
          <button
            type="submit"
            value="submit"
            className="bg-blue-400 w-[80%] mt-5 h-[2rem]">
            Submit
          </button>
        </form>
      </center>
    </main>
  );
};
