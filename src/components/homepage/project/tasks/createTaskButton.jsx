import { CiSquarePlus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

export const CreateTaskButton = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className="flex flex-row w-fit pb-1 mt-5 gap-x-1 text-orange-500 ml-[4rem] text-xs">
      <FiPlus className="mt-[0.1rem]" />
      Add task
    </button>
  );
};
