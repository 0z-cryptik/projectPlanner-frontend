import { useList } from "../../../../hooks/stateProvider";
import { useState } from "react";
import { EachSubTask } from "./eachSubTask";
import { SubTaskEditForm } from "./subTaskEditForm";

export const SubTaskList = () => {
  const { tasks, activeTask, setTasks, subTaskToEdit, setSubTaskToEdit } =
    useList();

  const completed = async (id) => {
    const res = await fetch("/api/subTask/delete?_method=DELETE", {
      method: "POST",
      body: JSON.stringify({ subTaskId: id }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await res.json();
    console.log(response);

    if (response.success) {
      setTasks(response.user.tasks);
    }
  };

  return (
    <section className="ml-[4rem]">
      {tasks[activeTask].subTasks.map((subTask, i) =>
        subTaskToEdit === i ? (
          <SubTaskEditForm subTask={subTask} />
        ) : (
          <EachSubTask
            subTask={subTask}
            i={i}
            clickHandler={completed}
          />
        )
      )}
    </section>
  );
};
