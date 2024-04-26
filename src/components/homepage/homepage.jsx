import { useList } from "../../hooks/stateProvider";
import { CreateNewProjectForm } from "./project/newProjectForm";
import { CreateNewProjectButton } from "./project/newProjectButton";
import { SideBar } from "./sideBar";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ProjectPage } from "./project/projectPage";
import { ErrorFlashMessage } from "../errorPages/errorFlashMessage";

export const Homepage = () => {
  const { user, projects, creatingNewProject, error, fixPage } = useList();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (user) {
    return (
      <main
        className={`w-screen h-screen flex flex-row ${
          fixPage && "fixed"
        }`}>
        <SideBar />
        <section className="ml-[20%] w-full">
          {!creatingNewProject && projects.length === 0 && (
            <CreateNewProjectButton />
          )}
          {creatingNewProject && <CreateNewProjectForm />}
          {!creatingNewProject && projects.length > 0 && <ProjectPage />}
        </section>
        {error && <ErrorFlashMessage message={error} />}
      </main>
    );
  }
};
