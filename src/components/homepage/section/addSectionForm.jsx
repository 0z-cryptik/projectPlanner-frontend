import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";

export const AddSectionForm = ({ hideForm }) => {
  const [title, setTitle] = useState("");
  const { projects, activeProject, fetchFunc } = useList();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("trying to add section");
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("section"),
      parentProject: projects[activeProject]._id
    };

    try {
      const { success } = await fetchFunc(
        "/api/section/create",
        data2submit
      );

      if (success) {
        hideForm();
      } else {
        console.log("no success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="ml-[4rem] w-[57%] border mt-5 p-4 rounded-xl">
      <input
        className="outline-none"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="enter section name"
        name="section"
        required
        autoFocus
      />
      <div className="w-fit ml-auto">
        <button
          onClick={hideForm}
          className="bg-red-600 mr-2 p-2 rounded-xl">
          cancel
        </button>
        <button
          className="bg-green-500 p-2 rounded-xl"
          type="submit"
          value="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
