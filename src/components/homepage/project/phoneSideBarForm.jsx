import { useState } from "react";
import { ProjectLoader } from "../../loaders/projectLoader";
import { useList } from "@/src/hooks/stateProvider";

export const PhoneSideBarForm = () => {
  const [projectName, setProjectName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const {
    fetchFunc,
    setActiveProject,
    setError,
    setShowPhoneForm,
    setShowMenu,
    user
  } = useList();

  const projectNameHandler = (e) => {
    setProjectName(e.target.value);
  };

  const hideForm = () => {
    setShowPhoneForm(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const form = new FormData(e.target);

    try {
      await fetchFunc(`/api/project/create?apiToken=${user.apiToken}`, {
        title: form.get("title")
      });
      setShowPhoneForm(false);
      setShowMenu(false);
      setActiveProject(0);
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
    <form
      className="border w-full mt-3 p-4 rounded-xl text-xs"
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
  );
};
