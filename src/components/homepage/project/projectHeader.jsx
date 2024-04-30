import { useList } from "../../../hooks/stateProvider";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { GoSidebarCollapse } from "react-icons/go";

export const ProjectHeader = ({ editHandler, deleteHandler }) => {
  const { projects, activeProject, setShowMenu } = useList();

  return (
    <>
      <div className="lg:flex flex-row border-b pb-5 hidden">
        <h1
          onClick={editHandler}
          className="lg:text-3xl text-xl max-md:font-semibold lg:ml-[4rem] ml-6 flex-grow cursor-text">
          {projects[activeProject].title}
        </h1>

        <button
          onClick={deleteHandler}
          className="hover:text-red-600 max-md:mr-4">
          <RiDeleteBin7Fill size={"1.5rem"} />
        </button>
      </div>

      <div className="flex flex-row mt-2 lg:hidden text-gray-600">
        <button className="flex flex-row"
          onClick={() => {
            setShowMenu(true);
          }}>
          <GoSidebarCollapse
            className="mx-3"
            size={"1.5rem"}
          />
          <p className="text-sm mt-1">My Projects /</p>
        </button>

        <p className="text-center flex-grow text-black font-bold text-lg">
          {projects[activeProject].title}
        </p>

        <button
          onClick={editHandler}
          className="text-black mr-2">
          <CiEdit />
        </button>
        <button
          onClick={deleteHandler}
          className="text-black mr-3">
          <RiDeleteBin7Fill />
        </button>
      </div>
    </>
  );
};
