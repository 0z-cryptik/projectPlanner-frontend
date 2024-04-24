import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";
import { SectionLoader } from "../../loaders/sectionLoader";

export const AddSectionForm = ({ hideForm }) => {
  const [title, setTitle] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { projects, activeProject, fetchFunc, setError } = useList();

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);

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
        setShowLoader(false);
        hideForm();
      } else {
        setError(
          "An error occured while creating your section, please try again"
        );
      }
    } catch (err) {
      setError(
        "An error occured while creating your section, please try again"
      );
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return <SectionLoader />;
  }

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
