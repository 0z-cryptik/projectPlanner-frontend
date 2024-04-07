import { useState } from "react";

export const SubmitName = ({ submitFunc }) => {
  const [name, setName] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <p>Please enter your name or your nickname</p>
      <form
        onSubmit={submitFunc}
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
    </>
  );
};
