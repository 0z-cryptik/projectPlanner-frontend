import { useList } from "../../../hooks/stateProvider";
import { IoAddCircleOutline } from "react-icons/io5";

export const CreateNewTaskButton = () => {
  const { setCreatingNewtask } = useList();

  return (
    <section className={`w-full h-full flex items-center justify-center`}>
      <div>
        <button
          className="bg-orange-400 text-white px-3 rounded-xl"
          onClick={() => {
            setCreatingNewtask(true);
          }}>
          Create a new task +
        </button>
      </div>
    </section>
  );
};

export const SideBarNewTaskButton = () => {
  const { setCreatingNewtask } = useList();

  return (
    <button
      onClick={() => {
        setCreatingNewtask(true);
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
