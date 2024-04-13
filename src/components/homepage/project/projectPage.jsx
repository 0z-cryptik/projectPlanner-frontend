import { useList } from "../../../hooks/stateProvider";
import { SubtaskForm } from "./tasks/newTaskForm";
import { CreateSubTaskButton } from "./tasks/createTaskButton";
import { SubTaskList } from "./tasks/taskList";
import { MdEdit } from "react-icons/md";
import { TaskEditForm } from "./projectEditForm";
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
          <TaskEditForm />
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
      {projects[activeProject].tasks.length > 0 && <SubTaskList />}
      {!createNewTask && <CreateSubTaskButton />}
      {createNewTask && <SubtaskForm />}
      <AddSectionButton />
    </section>
  );
};
