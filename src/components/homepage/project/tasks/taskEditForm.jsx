import { useList } from "../../../../hooks/stateProvider";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";
import { TaskLoader } from "../../../loaders/taskLoader";

export const TaskEditForm = ({ task, hideForm }) => {
  const { fetchFunc, setError } = useList();
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(new Date(task.dueDate));
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
      dueDate: form.get("date"),
      Id: task._id
    };

    try {
      const { success } = await fetchFunc(
        "/api/task/update?_method=PUT",
        data2submit
      );
      if (success) {
        setShowLoader(false);
      } else {
        setError("there was an error editing the task, please try again");
        setShowLoader(false);
      }
    } catch (err) {
      setError("there was an error editing the task, please try again");
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
          Due date/time:
        </label>
        <DateTimePicker
          value={date}
          onChange={setDate}
          id="datePicker"
          minDate={new Date()}
          name="date"
        />
      </span>
      <div className="w-fit mx-auto mt-5">
        <button
          onClick={hideForm}
          className="bg-red-500 text-white p-2 rounded-xl mr-3">
          Cancel
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded-xl"
          type="submit"
          value="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
