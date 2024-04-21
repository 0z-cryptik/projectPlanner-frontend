import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

export const ProjectEditForm = ({ project, cancelHandler }) => {
  const { fetchFunc } = useList();
  const [title, setTitle] = useState(project.title);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      projectId: project._id
    };

    try {
      fetchFunc("/api/project/update?_method=PUT", data2submit);
      cancelHandler();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="border-b flex flex-row pb-5"
      onSubmit={submitHandler}>
      <input
        className="w-full outline-none text-3xl ml-[4rem]"
        type="text"
        name="title"
        placeholder="Task name"
        value={title}
        onChange={titleChangeHandler}
        required
        autoFocus
      />

      <button
        className="rounded-xl mr-2 hover:text-green-500"
        type="submit"
        value="submit">
        <FaCircleCheck size={"1.5rem"} />
      </button>

      <button
        onClick={cancelHandler}
        className="rounded-xl hover:text-red-600">
        <MdCancel size={"1.8rem"} />
      </button>
    </form>
  );
};
