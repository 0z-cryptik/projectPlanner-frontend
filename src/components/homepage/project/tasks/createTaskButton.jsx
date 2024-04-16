import { useList } from "../../../../hooks/stateProvider";
import { CiSquarePlus } from "react-icons/ci";

export const CreateTaskButton = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className="flex flex-row border-b w-[57%] pb-1 mt-5 gap-x-2 hover:text-orange-500 hover:border-b-orange-500 text-sm ml-[4rem]">
      <CiSquarePlus size={"1.5rem"} />
      Add task
    </button>
  );
};
