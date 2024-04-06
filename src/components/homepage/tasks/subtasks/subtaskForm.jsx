import { useState } from "react";
import { useList } from "../../../../hooks/stateProvider";
import { IoCheckbox } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";

export const SubtaskForm = () => {
  const [title, setTitle] = useState("");
  const { tasks, setTasks, activeTask } = useList();

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = {
      title: form.get("title"),
      parentTask: tasks[activeTask]._id
    };

    try {
      const res = await fetch("/api/createSubTask", {
        method: "POST",
        body: JSON.stringify(title),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();
      console.log(response);

      if(response.success){
        setTasks(response.user.tasks)
        setTitle('')
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mt-4 ml-[4rem] w-[45%] border-b pl-2 flex flex-row">
      <input
        className="outline-none w-3/4 h-[2rem]"
        placeholder="enter subtask title"
        name="title"
        value={title}
        onChange={titleChangeHandler}
      />
      <span className="w-1/4 flex flex-row gap-x-4">
        <button title="Due date">
          <BsCalendarDateFill size={"1.6rem"} />
        </button>
        <button title="Cancel">
          <MdCancel
            size={"1.8rem"}
            color="red"
          />
        </button>
        <button
          type="submit"
          value="submit"
          title="Submit">
          <IoCheckbox
            size={"1.8rem"}
            color="green"
          />
        </button>
      </span>
    </form>
  );
};
