import { FaRegCircleUser } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { useList } from "../../hooks/stateProvider";
import { TaskList } from "./tasks/taskList";
import { SideBarNewTaskButton } from "./tasks/newTaskButton";
import { LogoutButton } from "./logoutButton";
import { PiUserSquareFill } from "react-icons/pi";

export const SideBar = () => {
  const { user, tasks } = useList();

  return (
    <nav className="w-1/5 h-full border-r px-3 py-4 bg-[#605770] text-white">
      <div className="">
        <PiUserSquareFill
          className="mx-auto"
          size={"7rem"}
        />
        <p className="mx-auto w-fit">{user ? user.name : "User"}</p>
        <p className="mx-auto w-fit">{user.email}</p>
        <LogoutButton />
      </div>
      <p className="font-bold mt-5">My Projects</p>
      <TaskList />
      <SideBarNewTaskButton />
    </nav>
  );
};
