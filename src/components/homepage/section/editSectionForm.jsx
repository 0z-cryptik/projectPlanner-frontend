import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useList } from "../../../hooks/stateProvider";
import { SectionLoader } from "../../loaders/sectionLoader";

export const EditSectionForm = ({ section, hideForm }) => {
  const [title, setTitle] = useState(section.title);
  const [showLoader, setShowLoader] = useState(false);
  const { fetchFunc, setError, user, server } = useList();

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      sectionId: section._id
    };

    try {
      const { success } = await fetchFunc(
        `${server}/api/section/update?_method=PUT&apiToken=${user.apiToken}`,
        data2submit
      );

      if (success) {
        hideForm();
      } else {
        throw new Error("there was an error");
      }
    } catch (err) {
      setError(
        "An error occured while editing your section, please try again"
      );
    } finally {
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return <SectionLoader />;
  }

  return (
    <form
      onSubmit={submitHandler}
      className="border w-[90%] p-2 flex flex-row gap-x-2">
      <input
        className="flex-grow border-r outline-none"
        type="text"
        name="title"
        pattern="[a-zA-Z0-9 ]*"
        title="Only letters and numbers are allowed"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
      <button
        type="submit"
        value="submit"
        className="hover:text-green-500">
        <FaCircleCheck />
      </button>
      <button
        onClick={hideForm}
        className="hover:text-red-600">
        <MdCancel size={"1.5rem"} />
      </button>
    </form>
  );
};
