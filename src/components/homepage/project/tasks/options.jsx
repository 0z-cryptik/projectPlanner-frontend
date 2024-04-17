import { CiEdit } from "react-icons/ci";
import { RiDeleteBin7Fill } from "react-icons/ri";

export const Options = ({ editButtonHandler, deleteButtonHandler }) => {
  return (
    <div className="flex flex-row gap-x-2">
      <button
        onClick={editButtonHandler}
        className="">
        <CiEdit />
      </button>

      <button
        onClick={deleteButtonHandler}
        className="text-red-600">
        <RiDeleteBin7Fill />
      </button>
    </div>
  );
};
