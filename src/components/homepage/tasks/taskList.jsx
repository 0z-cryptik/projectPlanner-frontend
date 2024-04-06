import { useList } from "../../../hooks/stateProvider";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoCheckbox } from "react-icons/io5";

export const TaskList = () => {
  const { tasks, activeTask, setActiveTask } = useList();

  return (
    <>
      <p className="font-bold mt-5">My tasks</p>

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
            <p className="w-1/2">{task.title}</p>
            <button className="ml-[4rem] mr-2">
              <IoCheckbox
                size={"1.4rem"}
                color="green"
                className=""
              />
            </button>
            <button className="">
              <RiDeleteBin7Fill
                size={"1.4rem"}
                color="red"
              />
            </button>
          </div>
        );
      })}
    </>
  );
};
