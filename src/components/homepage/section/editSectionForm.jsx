import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useList } from "../../../hooks/stateProvider";

export const EditSectionForm = ({ section, hideForm }) => {
  const [title, setTitle] = useState(section.title);
  const { fetchFunc } = useList();

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      sectionId: section._id
    };

    try {
      const { success } = await fetchFunc(
        "/api/section/update?_method=PUT",
        data2submit
      );

      if (success) {
        hideForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="border w-[62%] p-2 flex flex-row gap-x-2">
      <input
        className="flex-grow border-r outline-none"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
      <button
        onClick={hideForm}
        className="hover:text-red-600">
        <MdCancel size={"1.5rem"} />
      </button>
      <button
        type="submit"
        value="submit"
        className="hover:text-green-500">
        <FaCircleCheck />
      </button>
    </form>
  );
};