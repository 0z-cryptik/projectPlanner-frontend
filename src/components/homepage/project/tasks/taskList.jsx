import { useList } from "../../../../hooks/stateProvider";
import { useState } from "react";
import { EachTask } from "./eachTask";
import { TaskEditForm } from "./taskEditForm";
import { CreateTaskButton } from "./createTaskButton";
import { TaskForm } from "./newTaskForm";

export const TaskList = ({ tasks }) => {
  const {
    projects,
    activeProject,
    setProjects,
    taskToEdit,
    setTaskToEdit,
    createNewTask
  } = useList();

  const completeOrDelete = async (id) => {
    const res = await fetch("/api/task/delete?_method=DELETE", {
      method: "POST",
      body: JSON.stringify({ taskId: id }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await res.json();
    console.log(response);

    if (response.success) {
      setProjects(response.user.projects);
    }
  };

  return (
    <section className="ml-[4rem]">
      {tasks.map((task, i) =>
        taskToEdit === i ? (
          <TaskEditForm task={task} />
        ) : (
          <EachTask
            task={task}
            i={i}
            clickHandler={completeOrDelete}
          />
        )
      )}
    </section>
  );
};
