import { CheckMarkButton } from "./checkMarkButton";
import { useState } from "react";
import { Overlay } from "../../../overlay/overlay";
import { DeleteWarning } from "./deleteWarning";
import { TaskEditForm } from "./taskEditForm";
import { Options } from "./options";
import { DueDate } from "./dueDate";

export const EachTask = ({ task, i }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const completeOrDelete = async () => {
    const res = await fetch("/api/task/delete?_method=DELETE", {
      method: "POST",
      body: JSON.stringify({ taskId: task._id }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await res.json();
    console.log(response);

    if (response.success) {
      setProjects(response.user.projects);
    }
  };

  if (editTask) {
    return (
      <TaskEditForm
        task={task}
        hideForm={() => {
          setEditTask(false);
        }}
      />
    );
  }

  return (
    <div
      key={i}
      onMouseOver={() => {
        setShowOptions(true);
      }}
      onMouseLeave={() => {
        setShowOptions(false);
      }}
      className="w-[60%] flex flex-col gap-y-5 mt-7">
      <div className="flex flex-row border-b">
        <div>
          <CheckMarkButton clickFunc={completeOrDelete} />
        </div>

        <p className="text-lg flex-grow">{task.title}</p>

        {showOptions && (
          <Options
            editButtonHandler={() => {
              setEditTask(true);
              setShowOptions(false);
            }}
            deleteButtonHandler={() => {
              setShowDeleteWarning(true);
            }}
          />
        )}
      </div>
      <DueDate task={task} />

      {showDeleteWarning && (
        <>
          <DeleteWarning
            cancelHandler={() => {
              setShowDeleteWarning(false);
              setShowOptions(false);
            }}
            deleteHandler={() => {
              completeOrDelete();
              setShowDeleteWarning(false);
            }}
          />
          <Overlay deem={true} />
        </>
      )}
    </div>
  );
};
