import { FaRegCircleUser } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { useList } from "../hooks/stateProvider";
import { TaskList } from "./tasks/taskList";

export const SideBar = () => {
  const { user } = useList();

  return (
    <nav className="w-1/5 h-full border-r p-4 bg-[#605770] text-white">
      <div className="flex flex-row">
        <FaRegCircleUser
          size={"1.5rem"}
          className="mr-3"
        />
        {user ? user.name : "User"}
      </div>
      <button className="mt-2 text-sm text-orange-500">logout</button>

      <div className="flex flex-row mt-5">
        <IoAddCircleOutline
          size={"1.4rem"}
          className="mr-2"
        />
        Add task
      </div>

      <TaskList />
    </nav>
  );
};
