import { useList } from "../../../hooks/stateProvider";
import { TaskForm } from "./tasks/newTaskForm";
import { CreateTaskButton } from "./tasks/createTaskButton";
import { TaskList } from "./tasks/taskList";
import { AbandonProjectWarning } from "../../warnings/abandonProjectWarning";
import { Overlay } from "../../overlay/overlay";
import { ProjectEditForm } from "./projectEditForm";
import { AddSectionButton } from "../section/addSectionButton";
import { SectionList } from "../section/sectionList";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useState } from "react";
import { TaskLoader } from "../../loaders/taskLoader";

export const ProjectPage = () => {
  const {
    projects,
    activeProject,
    createNewTask,
    setCreateNewTask,
    fetchFunc,
    setError
  } = useList();

  const [editProject, setEditProject] = useState(false);
  const [showAbandonWarning, setShowAbandonWarning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const submitFunc = async (e) => {
    setShowLoader(true);
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      parentProject: projects[activeProject]._id,
      dueDate: form.get("date")
    };

    try {
      const { success } = await fetchFunc("/api/task/create", data2submit);
      if (success) {
        setShowLoader(false);
      } else {
        setError("there was an error creating the task, please try again");
        setShowLoader(false);
      }
    } catch (err) {
      setError("there was an error creating the task, please try again");
      setShowLoader(false);
    }
  };

  return (
    <section className={`w-full h-full pt-5 px-[4rem] `}>
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
            className="text-3xl ml-[4rem] flex-grow cursor-text">
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
        {showLoader && <TaskLoader />}
        {!createNewTask && !showLoader && (
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
