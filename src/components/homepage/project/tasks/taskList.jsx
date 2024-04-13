import { useList } from "../../../../hooks/stateProvider";
import { useState } from "react";
import { EachTask } from "./eachTask";
import { TaskEditForm } from "./taskEditForm";

export const TaskList = () => {
  const { projects, activeProjects, setProjects, taskToEdit, setTaskToEdit } =
    useList();

  const completeOrDelete = async (id) => {
    const res = await fetch("/api/task/delete?_method=DELETE", {
      method: "POST",
      body: JSON.stringify({ taskId: id }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await res.json();
    console.log(response);

    if (response.success) {
      setProjects(response.user.tasks);
    }
  };

  return (
    <section className="ml-[4rem]">
      {projects[activeProjects].tasks.map((task, i) =>
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
