import { useList } from "../../../hooks/stateProvider";
import { useState } from "react";
import { ProjectLoader } from "../../loaders/projectLoader";

export const CreateNewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { setCreatingNewProject, fetchFunc, setActiveProject, setError } =
    useList();

  const projectNameHandler = (e) => {
    setProjectName(e.target.value);
  };

  const hideForm = () => {
    setCreatingNewProject(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const form = new FormData(e.target);

    try {
      const { success } = await fetchFunc("/api/project/create", {
        title: form.get("title")
      });

      if (success) {
        setShowLoader(false);
        setCreatingNewProject(false);
        setActiveProject(0);
      } else {
        setError(
          "There was an error creating the project, please try again"
        );
      }
    } catch (err) {
      setError(
        "There was an error creating the project, please try again"
      );
      setShowLoader(false);
      setCreatingNewProject(false);
    }
  };

  if (showLoader) {
    return <ProjectLoader />;
  }

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
            Add project
          </button>
        </div>
      </form>
    </section>
  );
};
