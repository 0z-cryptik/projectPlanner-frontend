import { useList } from "../../hooks/stateProvider";
import { CreateNewProjectForm } from "./project/newProjectForm";
import { CreateNewProjectButton } from "./project/newProjectButton";
import { SideBar } from "./sideBar";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ProjectPage } from "./project/projectPage";
import { ErrorFlashMessage } from "../errorPages/errorFlashMessage";

export const Homepage = () => {
  const { user, projects, creatingNewProject, error, setError, setUser, setProjects } =
    useList();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const checkLoggedInUser = async () => {
        try {
          const res = await fetch("/api/user/check");
          const response = await res.json();
          if (response.success) {
            setUser(response.user);
            setProjects(response.user.projects)
          } else {
            navigate("/login");
          }
        } catch (err) {
          navigate("/login");
        }
      };

      checkLoggedInUser();
    }
  }, []);

  if (user) {
    return (
      <main className="w-screen h-screen flex flex-row">
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

//find a technology that generates random avatars and use those for dp
