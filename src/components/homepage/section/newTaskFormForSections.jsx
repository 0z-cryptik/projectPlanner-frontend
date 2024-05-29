import { useState } from "react";
import { useList } from "@/src/hooks/stateProvider";
import { DatePicker } from "@/src/components/datePicker/datePicker";
import { TaskLoader } from "@/src/components/loaders/taskLoader";

export const TaskForm = ({ hideForm, parentSection }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const { setError, fetchFunc, user } = useList();

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      parentSection,
      dueDate: date
    };

    try {
      const { success } = await fetchFunc(
        `/api/task/create?apiToken=${user.apiToken}`,
        data2submit
      );

      if (success) {
        setShowLoader(false);
      } else {
        setError(
          "An error occured while creating your task, please try again"
        );
      }
    } catch (err) {
      setError(
        "An error occured while creating your task, please try again"
      );
      setShowLoader(false);
    }

    setTitle("");
    setDate(null);
  };

  if (showLoader) {
    return <TaskLoader />;
  }

  return (
    <form
      onSubmit={submitFunc}
      className="mt-4 ml-6 lg:ml-[4rem] w-[86%] lg:w-[58%] text-sm lg:text-base border rounded-xl p-3">
      <span className="flex flex-row border-b mb-3">
        <input
          className="outline-none w-3/4 h-[2rem] bg-transparent"
          type="text"
          placeholder="enter task title"
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
          className="bg-green-500 text-white p-2 rounded-xl mr-3"
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
