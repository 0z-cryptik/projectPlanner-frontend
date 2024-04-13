import { useList } from "../../../hooks/stateProvider";
import { IoAddCircleOutline } from "react-icons/io5";

export const CreateNewProjectButton = () => {
  const { setCreatingNewProject } = useList();

  return (
    <section className={`w-full h-full flex items-center justify-center`}>
      <div>
        <button
          className="bg-orange-400 text-white px-3 rounded-xl"
          onClick={() => {
            setCreatingNewProject(true);
          }}>
          Create a new project +
        </button>
      </div>
    </section>
  );
};

export const SideBarNewProjectButton = () => {
  const { setCreatingNewProject } = useList();

  return (
    <button
      onClick={() => {
        setCreatingNewProject(true);
      }}
      className="flex flex-row mt-5 text-[#ECA400]">
      <IoAddCircleOutline
        size={"1.4rem"}
        className="mr-2"
      />
      Add Project
    </button>
  );
};
