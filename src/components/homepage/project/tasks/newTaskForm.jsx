import { useState } from "react";
import { useList } from "../../../../hooks/stateProvider";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export const TaskForm = ({ submitHandler, hideForm }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const { projects, setProjects, activeProject, setCreateNewTask } =
    useList();

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitHandler(e);
        setTitle("");
        setDate(null);
      }}
      className="mt-4 ml-[4rem] w-[58%] border rounded-xl p-3">
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
          Due date:
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
