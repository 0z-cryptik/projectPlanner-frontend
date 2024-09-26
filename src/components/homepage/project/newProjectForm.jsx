import { useList } from "../../../hooks/stateProvider";
import { useState } from "react";
import { ProjectLoader } from "../../loaders/projectLoader";

export const CreateNewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const {
    setCreatingNewProject,
    fetchFunc,
    setActiveProject,
    setError,
    showPhoneForm,
    setShowPhoneForm,
    setShowMenu,
    user,
    server
  } = useList();

  const projectNameHandler = (e) => {
    setProjectName(e.target.value);
  };

  const hideForm = () => {
    setCreatingNewProject(false);
    setShowPhoneForm(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const form = new FormData(e.target);

    try {
      const { success } = await fetchFunc(
        `${server}/api/project/create?apiToken=${user.apiToken}`,
        {
          title: form.get("title")
        }
      );

      if (success) {
        setCreatingNewProject(false);
        setShowPhoneForm(false);
        setShowMenu(false);
        setActiveProject(0);
      } else {
        throw new Error("There was an error");
      }
    } catch (err) {
      setError(
        "There was an error creating the project, please try again"
      );
    } finally {
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return <ProjectLoader />;
  }

  return (
    <section className="w-full h-full flex items-center justify-center mt-5 lg:mt-0">
      <form
        className="border w-[70%] lg:w-1/2 p-4 rounded-xl text-sm lg:text-base"
        onSubmit={submitHandler}>
        <input
          className="w-full outline-none border-b mb-3 bg-transparent"
          type="text"
          name="title"
          placeholder="Enter project name"
          pattern="[a-zA-Z0-9 ]*"
          title="Only letters and numbers are allowed"
          value={projectName}
          onChange={projectNameHandler}
          required
          autoFocus
        />

        <div className="w-fit mx-auto mt-3 gap-x-2 flex">
          <button
            className="bg-green-500 p-2 rounded-xl text-white"
            type="submit"
            value="submit">
            Add project
          </button>
          <button
            onClick={hideForm}
            className="bg-red-700 text-white p-2 rounded-xl">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
