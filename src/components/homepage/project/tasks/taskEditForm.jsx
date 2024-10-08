import { useList } from "../../../../hooks/stateProvider";
import { DatePicker } from "@/src/components/datePicker/datePicker";
import { useState } from "react";
import { TaskLoader } from "../../../loaders/taskLoader";

export const TaskEditForm = ({ task, hideForm = (f) => f }) => {
  const { fetchFunc, setError, user, server } = useList();
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const [showLoader, setShowLoader] = useState(false);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      dueDate: date,
      Id: task._id
    };

    try {
      const { success } = await fetchFunc(
        `${server}/api/task/update?_method=PUT&apiToken=${user.apiToken}`,
        data2submit
      );
      if (success) {
        hideForm();
      } else {
        throw new Error("There was an error");
      }
    } catch (err) {
      setError("there was an error editing the task, please try again");
    } finally {
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return <TaskLoader />;
  }

  return (
    <form
      onSubmit={submitHandler}
      className="mt-4 w-[90%] lg:w-[58%] text-xs lg:text-base border rounded-xl p-3">
      <span className="flex flex-row border-b mb-3">
        <input
          className="outline-none w-3/4 h-[2rem]"
          type="text"
          placeholder="enter subtask title"
          name="title"
          pattern="[a-zA-Z0-9 ]*"
          title="Only letters and numbers are allowed"
          value={title}
          onChange={titleChangeHandler}
          required
          autoFocus
        />
      </span>
      <span className="">
        <label
          className="mr-3"
          htmlFor="datePicker">
          Due date:
        </label>
        <DatePicker
          date={date}
          setDate={setDate}
        />
      </span>
      <div className="w-fit mx-auto mt-5">
        <button
          className="bg-green-500 text-white p-2 mr-3 rounded-xl"
          type="submit"
          value="submit">
          Submit
        </button>
        <button
          onClick={hideForm}
          className="bg-red-500 text-white p-2 rounded-xl">
          Cancel
        </button>
      </div>
    </form>
  );
};
