import { CheckMarkButton } from "./checkMarkButton";
import { useState } from "react";
import { Overlay } from "../../../overlay/overlay";
import { DeleteWarning } from "../../../warnings/taskDeleteWarning";
import { TaskEditForm } from "./taskEditForm";
import { Options } from "./options";
import { DueDate } from "./dueDate";
import { useList } from "../../../../hooks/stateProvider";
import soundEffect from "../../../../soundEffects/tap-notification-180637.mp3";
import { TaskCompletingLoader } from "@/src/components/loaders/taskCompleting";

export const EachTask = ({ task }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [completing, setCompleting] = useState(false);

  const { fetchFunc, setError, user, server, setCompleted } = useList();

  const playAudio = () => {
    new Audio(soundEffect).play();
  };

  const completeTask = async () => {
    setCompleting(true);

    try {
      const { success } = await fetchFunc(
        `${server}/api/task/delete?_method=DELETE&apiToken=${user.apiToken}`,
        { taskId: task._id }
      );

      if (success) {
        playAudio();
        setCompleted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  const deleteTask = () => {
    try {
      fetchFunc(
        `${server}/api/task/delete?_method=DELETE&apiToken=${user.apiToken}`,
        { taskId: task._id }
      );
    } catch (err) {
      setError("There was an error, please try again");
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
      
      className={`w-[90%] flex flex-row mt-7 border-b`}>
      {completing ? (
        <TaskCompletingLoader />
      ) : (
        <CheckMarkButton
          clickFunc={completeTask}
          additionalStyling={`${!task.dueDate && "mb-2"}`}
        />
      )}

      <div className="flex-grow">
        <p className="flex-grow text-sm lg:text-base">{task.title}</p>
        {task.dueDate && <DueDate date={task.dueDate} />}
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
              deleteTask();
              setShowDeleteWarning(false);
            }}
          />
          <Overlay deem={true} />
        </>
      )}
    </div>
  );
};
