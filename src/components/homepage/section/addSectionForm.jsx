import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";

export const AddSectionForm = () => {
  const [title, setTitle] = useState("");
  const { setProjects, projects, activeProject } = useList();

  const hideForm = () => {
    setShowForm(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data2submit = {
      title: form.get("section"),
      parentProject: projects[activeProject]._id
    };

    try {
      const res = await fetch("/api/section/create", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();

      console.log(response);
     
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
        <button className="bg-green-500 p-2 rounded-xl">Submit</button>
      </div>
    </form>
  );
};
