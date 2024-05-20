import { useList } from "../../hooks/stateProvider";
import { CreateNewProjectForm } from "./project/newProjectForm";
import { CreateNewProjectButton } from "./project/newProjectButton";
import { SideBar } from "./sideBar";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ProjectPage } from "./project/projectPage";
import { ErrorFlashMessage } from "../errorPages/errorFlashMessage";
import { GoSidebarCollapse } from "react-icons/go";
import { Overlay } from "../overlay/overlay";

export const Homepage = () => {
  const { user, projects, showMenu, creatingNewProject, error, fixPage, darkMode } =
    useList();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (user) {
    return (
      <>
        <main
          className={`w-screen h-screen flex flex-row ${darkMode && 'bg-black text-white'} ${
            fixPage && "fixed"
          }`}>
          <SideBar />
          <section className="lg:ml-[20%] w-full">
            {!creatingNewProject && projects.length === 0 && (
              <CreateNewProjectButton />
            )}
            {creatingNewProject && <CreateNewProjectForm />}
            {!creatingNewProject && projects.length > 0 && <ProjectPage />}
          </section>
          {error && <ErrorFlashMessage message={error} />}
          {showMenu && <Overlay deem />}
        </main>
      </>
    );
  }
};
