import { useList } from "../../../hooks/stateProvider";
import { TaskForm } from "./tasks/newTaskForm";
import { CreateTaskButton } from "./tasks/createTaskButton";
import { TaskList } from "./tasks/taskList";
import { MdEdit } from "react-icons/md";
import { ProjectEditForm } from "./projectEditForm";
import { AddSectionButton } from "../section/addSectionButton";
import { SectionList } from "../section/sectionList";

export const ProjectPage = () => {
  const {
    projects,
    activeProject,
    createNewTask,
    setEditProject,
    editProject, 
    setCreateNewTask,
    fetchFunc
  } = useList();

  const submitFunc = (e) => {
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      parentProject: projects[activeProject]._id,
      dueDate: form.get("date")
    };

    try {
      fetchFunc("/api/task/create", data2submit);
    } catch (err) {
      console.error(err);
    }
  };

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
      
        <>
          <TaskList tasks={projects[activeProject].tasks} />
          {!createNewTask && (
            <CreateTaskButton
              clickHandler={() => {
                setCreateNewTask(true);
              }}
            />
          )}
          {createNewTask && (
            <TaskForm
              submitHandler={submitFunc}
              hideForm={() => {
                setCreateNewTask(false);
              }}
            />
          )}
        </>
      
      {projects[activeProject].sections.length > 0 && (
        <SectionList sections={projects[activeProject].sections} />
      )}

      <AddSectionButton />
    </section>
  );
};
