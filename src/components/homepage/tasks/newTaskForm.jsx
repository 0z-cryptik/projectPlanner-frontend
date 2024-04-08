import { useList } from "../../../hooks/stateProvider";
import { TaskFormButton } from "./taskFormButtons";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export const CreateNewTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState();
  const { setCreatingNewtask, tasks, setTasks } = useList();

  const taskNameHandler = (e) => {
    setTaskName(e.target.value);
  };

  const hideForm = () => {
    setCreatingNewtask(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      dueDate: form.get("date")
    };

    try {
      const res = await fetch("/api/createTask", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      console.log(response);
      setTasks(response.data.tasks);
      setCreatingNewtask(false);
    } catch (err) {
      console.error(err);
      setCreatingNewtask(false);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <form
        className="border w-1/2 p-4 rounded-xl"
        onSubmit={submitHandler}>
        <input
          className="w-full outline-none border-b mb-3"
          type="text"
          name="title"
          placeholder="Task name"
          value={taskName}
          onChange={taskNameHandler}
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
            Add task
          </button>
        </div>
      </form>
    </section>
  );
};
