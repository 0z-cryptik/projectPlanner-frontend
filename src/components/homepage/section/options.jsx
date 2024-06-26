import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useList } from "@/src/hooks/stateProvider";

export const Options = ({
  editButtonHandler,
  deleteButtonHandler,
  showOptions
}) => {
  const { darkMode } = useList();

  return (
    <div
      className={`border rounded-xl w-fit p-3 absolute ${
        darkMode ? "bg-black" : "bg-gray-100"
      } z-20 text-sm lg:text-base left-[75%] lg:left-[83.5%] mt-5 ${
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
