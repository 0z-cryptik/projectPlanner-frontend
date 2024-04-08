import { FaRegCircleUser } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { useList } from "../../hooks/stateProvider";
import { TaskList } from "./tasks/taskList";
import { SideBarNewTaskButton } from "./tasks/newTaskButton";
import { LogoutButton } from "./logoutButton";

export const SideBar = () => {
  const { user } = useList();

  return (
    <nav className="w-1/5 h-full border-r px-3 py-4 bg-[#605770] text-white">
      <div className="flex flex-row">
        <FaRegCircleUser
          size={"1.5rem"}
          className="mr-3"
        />
        {user ? user.name : "User"}
      </div>
      <LogoutButton />

      <SideBarNewTaskButton />

      <TaskList />
    </nav>
  );
};
