import { useList } from "../../../hooks/stateProvider";
import { ProjectFormButton } from "./projectFormButtons";
import { useState } from "react";

export const CreateNewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const { setCreatingNewProject, projects, setProjects } = useList();

  const projectNameHandler = (e) => {
    setProjectName(e.target.value);
  };

  const hideForm = () => {
    setCreatingNewProject(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title")
        }),
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      console.log(response);
      setProjects(response.user.projects);
      setCreatingNewProject(false);
    } catch (err) {
      console.error(err);
      setCreatingNewProject(false);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <form
        className="border w-1/2 p-4 rounded-xl"
        onSubmit={submitHandler}>
        <input
          className="w-full outline-none border-b mb-3"
          type="text"
          name="title"
          placeholder="Enter project name"
          value={projectName}
          onChange={projectNameHandler}
          required
          autoFocus
        />

        <div className="w-fit mx-auto mt-3 gap-x-2 flex">
          <button
            onClick={hideForm}
            className="bg-red-700 text-white p-2 rounded-xl">
            Cancel
          </button>
          <button
            className="bg-green-500 p-2 rounded-xl text-white"
            type="submit"
            value="submit">
            Add task
          </button>
        </div>
      </form>
    </section>
  );
};
