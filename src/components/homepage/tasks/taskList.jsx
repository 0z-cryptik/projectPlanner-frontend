import { useList } from "../../../hooks/stateProvider";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoCheckbox } from "react-icons/io5";
import { LiaProjectDiagramSolid } from "react-icons/lia";

export const TaskList = () => {
  const { tasks, activeTask, setActiveTask } = useList();

  return (
    <>
      

      {tasks.map((task, i) => {
        return (
          <div
            key={i}
            className={`mt-3 cursor-pointer flex flex-row text-sm p-2 ${
              activeTask === i ? "bg-[#B2B1CF] text-black rounded-xl" : ""
            }`}
            onClick={() => {
              setActiveTask(i);
            }}>
            <LiaProjectDiagramSolid className="mt-1 mr-3"/>
            <p className="w-1/2">{task.title}</p>
          </div>
        );
      })}
    </>
  );
};
