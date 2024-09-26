import { useList } from "../../hooks/stateProvider";
import { ProjectList } from "./project/projectList";
import {
  SideBarNewProjectButton,
  PhoneSideBarNewProjectButton
} from "./project/newProjectButton";
import { LogoutButton } from "./logoutButton";
import { Avatar } from "../avatar/avatar";
import { GoSidebarExpand } from "react-icons/go";
import { ChangeThemeButton } from "./changeThemeButton";

export const SideBar = () => {
  const { user, showMenu, setShowMenu, darkMode } = useList();

  return (
    <>
      <nav
        className={`w-1/5 h-full border-r px-3 py-4 fixed overflow-y-scroll hidden lg:block ${
          darkMode ? "bg-black text-white" : "bg-[#f4f4f6] text-black"
        }`}>
        <div>
          <Avatar user={user} />
          <p className="mx-auto w-fit">{user.name ? user.name : "User"}</p>
          <p className="mx-auto w-fit text-sm">{user.email}</p>
          <ChangeThemeButton />
          <LogoutButton />
        </div>
        <p className="font-bold mt-5">My Projects</p>
        <ProjectList />
        <SideBarNewProjectButton />
      </nav>

      <nav
        style={{
          transform: `${
            showMenu
              ? `translate3d(0vw, 0, 0)`
              : "translate3d(-60vw, 0, 0)"
          }`,
          zIndex: "30",
          transition: `transform .15s linear`
        }}
        className={`w-3/5 h-full border-r px-3 py-4 ${
          darkMode ? "bg-black text-white" : "bg-[#f4f4f6] text-black"
        } fixed overflow-y-scroll lg:hidden `}>
        <div className="flex items-end justify-end mb-3">
          <button
            onClick={() => {
              setShowMenu(false);
            }}>
            <GoSidebarExpand size={"1.5rem"} />
          </button>
        </div>
        <div>
          <Avatar user={user} />
          <p className="mx-auto w-fit">{user.name ? user.name : "User"}</p>
          <p className="mx-auto w-fit text-sm">{user.email}</p>
          <ChangeThemeButton />
          <LogoutButton />
        </div>
        <p className="font-bold mt-5">My Projects</p>
        <ProjectList />
        <PhoneSideBarNewProjectButton />
      </nav>
    </>
  );
};
