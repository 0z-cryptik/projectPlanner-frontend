import { useList } from "../../hooks/stateProvider";
import { CreateNewProjectForm } from "./project/newProjectForm";
import { CreateNewProjectButton } from "./project/newProjectButton";
import { SideBar } from "./sideBar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ProjectPage } from "./project/projectPage";
import { ErrorFlashMessage } from "../errorPages/errorFlashMessage";
import { Overlay } from "../overlay/overlay";

export const Homepage = () => {
  const [checkingLoginState, setCheckLoginState] = useState();
  const {
    user,
    setUser,
    projects,
    showMenu,
    creatingNewProject,
    error,
    darkMode,
    setProjects,
    server
  } = useList();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      loginStateCheck();
    }
  }, []);

  const loginStateCheck = async () => {
    setCheckLoginState(true);
    try {
      const res = await fetch(`${server}/api/user/check`, {
        credentials: "include"
      });
      const response = await res.json();
      console.log(response);
      setUser(response.user);
      setProjects(response.user.projects.reverse());
    } catch (err) {
      navigate("/login");
    } finally {
      setCheckLoginState(false);
    }
  };

  if (!user && checkingLoginState) {
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <p className="text-2xl">LOADING</p>
      </main>
    );
  }

  if (user) {
    return (
      <>
        <main
          className={`w-screen min-h-screen flex flex-row ${
            darkMode && "bg-black text-white"
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
