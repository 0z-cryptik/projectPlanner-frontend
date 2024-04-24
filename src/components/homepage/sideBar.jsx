import { useList } from "../../hooks/stateProvider";
import { ProjectList } from "./project/projectList";
import { SideBarNewProjectButton } from "./project/newProjectButton";
import { LogoutButton } from "./logoutButton";
import { PiUserSquareFill } from "react-icons/pi";

export const SideBar = () => {
  const { user } = useList();

  return (
    <nav className="w-1/5 h-full border-r px-3 py-4 bg-[#605770] text-white fixed overflow-y-scroll">
      <div className="">
        {user.avatar ? (
          <img
            className="w-[7rem] h-[7rem] mx-auto border rounded-xl mb-3"
            src={user.avatar}
          />
        ) : (
          <PiUserSquareFill
            className="mx-auto"
            size={"7rem"}
          />
        )}
        <p className="mx-auto w-fit">{user.name ? user.name : "User"}</p>
        <p className="mx-auto w-fit text-sm">{user.email}</p>
        <LogoutButton />
      </div>
      <p className="font-bold mt-5">My Projects</p>
      <ProjectList />
      <SideBarNewProjectButton />
    </nav>
  );
};
