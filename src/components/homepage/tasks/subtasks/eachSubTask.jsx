import { IoCheckbox } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { dueDateHandler } from "../../../../functions/dueDateHandler";
import { useList } from "../../../../hooks/stateProvider";

export const EachSubTask = ({ subTask, i, clickHandler }) => {
  const { subTaskToEdit, setSubTaskToEdit } = useList();

  return (
    <div
      key={i}
      className="w-[60%] flex flex-col gap-y-5 mt-7">
      <div className="flex flex-row border-b">
        <div>
          <button
            onClick={() => {
              setSubTaskToEdit(i);
            }}
            className="text-[#6C6F7F] hover:text-black mr-3">
            <MdEdit size={"1.3rem"} />
          </button>
          <button className="mr-3 hover:text-red-500 text-[#6C6F7F]">
            <RiDeleteBin7Fill size={"1.3rem"} />
          </button>
          <button
            onClick={() => {
              clickHandler(subTask._id);
            }}
            className="mr-5 hover:text-green-500 text-[#6C6F7F]">
            <IoCheckbox size={"1.3rem"} />
          </button>
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
