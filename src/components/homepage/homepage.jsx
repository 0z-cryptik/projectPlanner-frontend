import { useList } from "../../hooks/stateProvider";
import { CreateNewProjectForm } from "./project/newProjectForm";
import { CreateNewProjectButton } from "./project/newProjectButton";
import { SideBar } from "./sideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectPage } from "./project/projectPage";
import { ErrorFlashMessage } from "../flashMessages/errorFlashMessage";
import { Overlay } from "../overlay/overlay";
import { TaskCompleted } from "../flashMessages/taskCompletedFlash";
import { LandingPageLoader } from "../loaders/landingPageLoader";

export const Homepage = () => {
  const [checkingLoginState, setCheckLoginState] = useState(false);
  const {
    user,
    setUser,
    projects,
    showMenu,
    creatingNewProject,
    error,
    darkMode,
    setProjects,
    completed,
    server
  } = useList();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      loginStateCheck();
    }
  }, []);

  const loginStateCheck = async () => {
    const token = localStorage.getItem("userToken");

    // 1. If no token exists in storage, don't bother fetching; go straight to login
    if (!token) {
      navigate("/login");
      return;
    }

    setCheckLoginState(true);

    try {
      // 2. Pass JWT in the Authorization header
      const res = await fetch(`${server}/api/user/check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const response = await res.json();

      if (response.success && response.user) {
        setUser(response.user);
        setProjects(
          response.user.projects ? [...response.user.projects].reverse() : []
        );
      } else {
        // Token is invalid or expired
        localStorage.removeItem("userToken");
        navigate("/login");
      }
    } catch (err) {
      console.error("Authentication check failed:", err);
      localStorage.removeItem("userToken");
      navigate("/login");
    } finally {
      setCheckLoginState(false);
    }
  };

  if (!user && checkingLoginState) {
    return <LandingPageLoader />;
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
          {completed && <TaskCompleted />}
          {showMenu && <Overlay deem />}
        </main>
      </>
    );
  }

  return null;
};