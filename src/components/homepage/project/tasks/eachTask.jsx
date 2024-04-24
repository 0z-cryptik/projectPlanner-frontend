import { CheckMarkButton } from "./checkMarkButton";
import { useState } from "react";
import { Overlay } from "../../../overlay/overlay";
import { DeleteWarning } from "./deleteWarning";
import { TaskEditForm } from "./taskEditForm";
import { Options } from "./options";
import { DueDate } from "./dueDate";
import { useList } from "../../../../hooks/stateProvider";

export const EachTask = ({ task }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const { fetchFunc, setError } = useList();

  const completeOrDelete = () => {
    try {
      fetchFunc("/api/task/delete?_method=DELETE", { taskId: task._id });
    } catch (err) {
      setError('There was an error, please try again')
      console.error(err);
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
      onMouseOver={() => {
        setShowOptions(true);
      }}
      onMouseLeave={() => {
        setShowOptions(false);
      }}
      className="w-[60%] flex flex-row mt-7 border-b">
      <CheckMarkButton
        clickFunc={completeOrDelete}
        additionalStyling={`${!task.dueDate && "mb-2"}`}
      />

      <div className="flex-grow">
        <p className="flex-grow">{task.title}</p>
        {task.dueDate && <DueDate task={task} />}
      </div>
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
