import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

export const Options = ({ editButtonHandler, deleteButtonHandler, showOptions }) => {
  return (
    <div
      className={`border rounded-xl w-fit p-3 absolute bg-white z-20 left-[63%] ${
        !showOptions && "hidden"
      }`}>
      <button
        onClick={editButtonHandler}
        className="border-b flex flex-row gap-x-1">
        Edit
        <MdEdit
          className="mt-[5px]"
          size={"0.8rem"}
        />
      </button>
      <button
        onClick={deleteButtonHandler}
        className="flex flex-row gap-x-1 text-red-600 mt-2">
        Delete
        <RiDeleteBin7Fill className="mt-[5px]" />
      </button>
    </div>
  );
};
