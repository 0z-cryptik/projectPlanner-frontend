import { useList } from "../../../../hooks/stateProvider";
import { CiSquarePlus } from "react-icons/ci";

export const CreateSubTaskButton = () => {
  const { setCreateNewSubTask } = useList();

  return (
    <button
      onClick={() => {
        setCreateNewSubTask(true);
      }}
      className="flex flex-row border-b ml-[4rem] w-[57%] pb-1 mt-5 gap-x-2 hover:text-orange-500 hover:border-b-orange-500">
      <CiSquarePlus size={"1.5rem"} />
      Add subtask
    </button>
  );
};
