import { useList } from "../hooks/stateProvider";
import { CreateNewTaskButton } from "./tasks/newTaskButton";
import { CreateNewTaskForm } from "./tasks/newTaskForm";
import { SideBar } from "./sideBar";

export const Homepage = () => {
  const { user, tasks, setTasks, creatingNewTask } = useList();

  return (
    <main className="w-screen h-screen flex flex-row">
      <SideBar />

      {!creatingNewTask && <CreateNewTaskButton />}
      {creatingNewTask && <CreateNewTaskForm />}
    </main>
  );
};


//find a technology that generates random avatars and use those for dp
