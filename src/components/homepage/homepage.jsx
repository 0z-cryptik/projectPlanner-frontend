import { useList } from "../../hooks/stateProvider";
import { CreateNewTaskForm } from "./tasks/newTaskForm";
import { CreateNewTaskButton } from "./tasks/newTaskButton";
import { SideBar } from "./sideBar";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Homepage = () => {
  const { user, tasks, setTasks, creatingNewTask, activeTask } = useList();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (user) {
    return (
      <main className="w-screen h-screen flex flex-row">
        <SideBar />

        {!creatingNewTask && tasks.length === 0 && <CreateNewTaskButton />}
        {creatingNewTask && <CreateNewTaskForm />}
        {!creatingNewTask && tasks.length > 0 && (
          <section className="w-full h-full">
            <h1>{tasks[activeTask].title}</h1>
          </section>
        )}
      </main>
    );
  }
};

//find a technology that generates random avatars and use those for dp
