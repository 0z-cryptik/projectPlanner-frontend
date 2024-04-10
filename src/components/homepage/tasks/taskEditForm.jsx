import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export const TaskEditForm = () => {
  const { tasks, activeTask, setEditTask, setTasks } = useList();
  const [date, setDate] = useState(tasks[activeTask].dueDate);
  const [title, setTitle] = useState(tasks[activeTask].title);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const hideForm = () => {
    setEditTask(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      dueDate: form.get("date"),
      taskId: tasks[activeTask]._id
    };

    try {
      const res = await fetch("/api/task/update?_method=PUT", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();
      console.log(response);

      if (response.success) {
        setTasks(response.user.tasks);
        setEditTask(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="border w-1/2 p-4 rounded-xl"
      onSubmit={submitHandler}>
      <input
        className="w-full outline-none border-b mb-3"
        type="text"
        name="title"
        placeholder="Task name"
        value={title}
        onChange={titleChangeHandler}
        required
        autoFocus
      />
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

      <div className="w-fit mx-auto mt-3 gap-x-2 flex">
        <button
          onClick={hideForm}
          className="bg-red-700 text-white p-2 rounded-xl">
          Cancel
        </button>
        <button
          className="bg-green-500 p-2 rounded-xl text-white"
          type="submit"
          value="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
