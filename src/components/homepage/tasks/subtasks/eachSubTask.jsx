import { IoCheckbox } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { dueDateHandler } from "../../../../functions/dueDateHandler";
import { useList } from "../../../../hooks/stateProvider";
import { IoIosCheckmark } from "react-icons/io";
import { CheckMarkButton } from "./checkMarkButton";

export const EachSubTask = ({ subTask, i, clickHandler }) => {
  const { subTaskToEdit, setSubTaskToEdit } = useList();

  // for the editSubTask functionality
  /* onClick={() => {
              setSubTaskToEdit(i);
            }} */

  return (
    <div
      key={i}
      className="w-[60%] flex flex-col gap-y-5 mt-7">
      <div className="flex flex-row border-b">
        <div>
          <button
            onClick={() => {
              clickHandler(subTask._id);
            }}
            className="mr-5 hover:text-green-500 text-[#6C6F7F] hidden">
            <IoCheckbox size={"1.3rem"} />
          </button>

          <CheckMarkButton
            clickFunc={() => {
              clickHandler(subTask._id);
            }}
          />
        </div>
        <p className="text-lg w-3/5">{subTask.title}</p>
      </div>
      <p className="text-xs">
        {subTask.dueDate
          ? dueDateHandler(subTask.dueDate)
          : "Due in 3 days"}
      </p>
    </div>
  );
};
