import { IoCheckbox } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { dueDateHandler } from "../../../../functions/dueDateHandler";
import { useList } from "../../../../hooks/stateProvider";
import { IoIosCheckmark } from "react-icons/io";
import { CheckMarkButton } from "./checkMarkButton";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import { Overlay } from "../../../overlay/overlay";
import { DeleteWarning } from "./deleteWarning";

export const EachTask = ({ task, i, clickHandler }) => {
  const { taskToEdit, setTaskToEdit } = useList();
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  return (
    <>
      <div
        key={i}
        className="w-[60%] flex flex-col gap-y-5 mt-7">
        <div className="flex flex-row border-b">
          <div>
            <CheckMarkButton
              clickFunc={() => {
                clickHandler(task._id);
              }}
            />
          </div>
          <p className="text-lg flex-grow">{task.title}</p>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`w-fit h-fit px-2 ${
              showOptions && "border rounded-xl bg-gray-200"
            }`}>
            <SlOptions />
          </button>
        </div>
        <p className="text-xs">{dueDateHandler(task.dueDate)}</p>
        <div
          className={`border rounded-xl w-fit p-3 absolute bg-white z-20 left-[63%] mt-6 ${
            !showOptions && "hidden"
          }`}>
          <button
            onClick={() => {
              setTaskToEdit(i);
            }}
            className="border-b flex flex-row gap-x-1">
            Edit
            <MdEdit
              className="mt-[5px]"
              size={"0.8rem"}
            />
          </button>
          <button
            onClick={() => {
              setShowDeleteWarning(true);
              setShowOptions(false);
            }}
            className="flex flex-row gap-x-1 text-red-600 mt-2">
            Delete
            <RiDeleteBin7Fill className="mt-[5px]" />
          </button>
        </div>
      </div>
      {showOptions && (
        <Overlay
          clickHandler={() => {
            setShowOptions(false);
          }}
        />
      )}
      {showDeleteWarning && (
        <>
          <DeleteWarning
            cancelHandler={() => {
              setShowDeleteWarning(false);
            }}
            deleteHandler={() => {
              clickHandler(task._id);
              setShowDeleteWarning(false);
            }}
          />
          <Overlay deem={true} />
        </>
      )}
    </>
  );
};
