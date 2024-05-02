import { CheckMarkButton } from "./checkMarkButton";
import { useState } from "react";
import { Overlay } from "../../../overlay/overlay";
import { DeleteWarning } from "../../../warnings/taskDeleteWarning";
import { TaskEditForm } from "./taskEditForm";
import { Options } from "./options";
import { DueDate } from "./dueDate";
import { useList } from "../../../../hooks/stateProvider";
import soundEffect from "../../../../soundEffects/tap-notification-180637.mp3";

export const EachTask = ({ task }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [popAndFade, setPopAndFade] = useState(false);
  const { fetchFunc, setError } = useList();

  const playAudio = () => {
    new Audio(soundEffect).play();
  };

  const completeOrDelete = () => {
    setPopAndFade(true);
    setTimeout(() => {
      try {
        fetchFunc("/api/task/delete?_method=DELETE", { taskId: task._id });
        playAudio();
        setPopAndFade(false);
      } catch (err) {
        setError("There was an error, please try again");
        console.error(err);
      }
    }, 200);
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
      className={`w-[90%] flex flex-row mt-7 border-b ${
        popAndFade && "growAndFade"
      }`}>
      <CheckMarkButton
        clickFunc={completeOrDelete}
        additionalStyling={`${!task.dueDate && "mb-2"}`}
      />

      <div className="flex-grow">
        <p className="flex-grow text-sm lg:text-base">{task.title}</p>
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
