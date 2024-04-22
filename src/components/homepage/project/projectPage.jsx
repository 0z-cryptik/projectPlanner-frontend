import { useList } from "../../../hooks/stateProvider";
import { TaskForm } from "./tasks/newTaskForm";
import { CreateTaskButton } from "./tasks/createTaskButton";
import { TaskList } from "./tasks/taskList";
import { AbandonProjectWarning } from "./abandonProjectWarning";
import { Overlay } from "../../overlay/overlay";
import { ProjectEditForm } from "./projectEditForm";
import { AddSectionButton } from "../section/addSectionButton";
import { SectionList } from "../section/sectionList";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useState } from "react";

export const ProjectPage = () => {
  const {
    projects,
    activeProject,
    createNewTask,
    setCreateNewTask,
    fetchFunc
  } = useList();

  const [editProject, setEditProject] = useState(false);
  const [showAbandonWarning, setShowAbandonWarning] = useState(false);

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
    <section
      className={`w-full h-full pt-5 px-[4rem] ${
        showAbandonWarning && "fixed"
      }`}>
      {editProject ? (
        <ProjectEditForm
          project={projects[activeProject]}
          cancelHandler={() => {
            setEditProject(false);
          }}
        />
      ) : (
        <div className="flex flex-row border-b pb-5">
          <h1
            onClick={() => {
              setEditProject(true);
            }}
            className="text-3xl ml-[4rem] flex-grow">
            {projects[activeProject].title}
          </h1>

          <button
            onClick={() => {
              setShowAbandonWarning(true);
            }}
            className="hover:text-red-600">
            <RiDeleteBin7Fill size={"1.5rem"} />
          </button>
        </div>
      )}

      {showAbandonWarning && (
        <>
          <AbandonProjectWarning
            projectId={projects[activeProject]._id}
            cancelHandler={() => {
              setShowAbandonWarning(false);
            }}
          />{" "}
          <Overlay deem />
        </>
      )}

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