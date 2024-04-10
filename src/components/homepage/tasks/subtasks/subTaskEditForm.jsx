import { useList } from "../../../../hooks/stateProvider";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";

export const SubTaskEditForm = ({ subTask }) => {
  const { tasks, activeTask, setSubTaskToEdit, setTasks } = useList();
  const [title, setTitle] = useState(subTask.title);
  const [date, setDate] = useState(new Date(subTask.dueDate));

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      dueDate: form.get("date"),
      Id: subTask._id
    };

    try {
      const res = await fetch("/api/subTask/update?_method=PUT", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();
      console.log(response);

      if (response.success) {
        setTasks(response.user.tasks);
        setSubTaskToEdit(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const hideForm = () => {
    setSubTaskToEdit(null);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mt-4 w-[58%] border rounded-xl p-3">
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
          maxDate={new Date(tasks[activeTask].dueDate)}
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
