import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";

export const ProjectEditForm = () => {
  const { projects, activeProject, setEditProject, setProjects } = useList();
  const [title, setTitle] = useState(projects[activeProject].title);

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
      projectId: tasks[activeTask]._id
    };

    try {
      const res = await fetch("/api/project/update?_method=PUT", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();
      console.log(response);

      if (response.success) {
        setProjects(response.user.tasks);
        setEditProject(false);
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
