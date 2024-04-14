import { useList } from "../../../hooks/stateProvider";
import { TaskForm } from "./tasks/newTaskForm";
import { CreateTaskButton } from "./tasks/createTaskButton";
import { TaskList } from "./tasks/taskList";
import { MdEdit } from "react-icons/md";
import { ProjectEditForm } from "./projectEditForm";
import { AddSectionButton } from "../section/addSectionButton";

export const ProjectPage = () => {
  const {
    projects,
    activeProject,
    createNewTask,
    setEditProject,
    editProject
  } = useList();

  return (
    <section className="w-full h-full pt-5 px-[4rem]">
      <div className="flex flex-row border-b pb-5">
        {editProject ? (
          <ProjectEditForm />
        ) : (
          <h1 className="text-3xl w-fit ml-[4rem]">
            {projects[activeProject].title}
          </h1>
        )}

        {!editProject && (
          <>
            <button
              onClick={() => {
                setEditProject(true);
              }}
              className="ml-6 mr-3 hidden">
              <MdEdit size={"1.5rem"} />
            </button>
          </>
        )}
      </div>
      {projects[activeProject].tasks.length > 0 && <TaskList />}
      {!createNewTask && <CreateTaskButton />}
      {createNewTask && <TaskForm />}
      <AddSectionButton />
    </section>
  );
};
