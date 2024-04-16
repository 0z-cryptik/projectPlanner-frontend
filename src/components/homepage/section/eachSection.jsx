import { useState } from "react";
import { TaskList } from "../project/tasks/taskList";
import { TaskForm } from "../project/tasks/newTaskForm";
import { CreateTaskButton } from "../project/tasks/createTaskButton";
import { useList } from "../../../hooks/stateProvider";

export const EachSection = ({ section, key }) => {
  const [createTask, setCreateTask] = useState(false);
  const {setProjects} = useList()

  return (
    <div
      key={key}
      className="mt-7">
      <h1 className="text-xl ml-[4rem]">{section.title}</h1>
      <TaskList tasks={section.tasks} />
      {!createTask && (
        <CreateTaskButton
          clickHandler={() => {
            setCreateTask(true);
          }}
        />
      )}
      {createTask && (
        <TaskForm
          hideForm={() => {
            setCreateTask(false);
          }}
          submitHandler={async (e) => {
            
            const form = new FormData(e.target);

            const data2submit = {
              title: form.get("title"),
              parentSection: section._id,
              dueDate: form.get("date")
            };

            try {
              const res = await fetch("/api/task/create", {
                method: "POST",
                body: JSON.stringify(data2submit),
                headers: { "Content-Type": "application/json" }
              });

              const response = await res.json();
              console.log(response);

              if (response.success) {
                setProjects(response.user.projects);
              }
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </div>
  );
};
