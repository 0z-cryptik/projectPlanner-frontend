import { useList } from "../../../hooks/stateProvider";
import { TaskForm } from "./tasks/newTaskForm";
import { CreateTaskButton } from "./tasks/createTaskButton";
import { TaskList } from "./tasks/taskList";
import { AbandonProjectWarning } from "../../warnings/abandonProjectWarning";
import { Overlay } from "../../overlay/overlay";
import { ProjectEditForm } from "./projectEditForm";
import { AddSectionButton } from "../section/addSectionButton";
import { SectionList } from "../section/sectionList";
import { useState } from "react";
import { ProjectHeader } from "./projectHeader";

export const ProjectPage = () => {
  const { projects, activeProject, createNewTask, setCreateNewTask } =
    useList();

  const [editProject, setEditProject] = useState(false);
  const [showAbandonWarning, setShowAbandonWarning] = useState(false);

  return (
    <section className={`w-full h-full pt-5 lg:px-[4rem]`}>
      {editProject ? (
        <ProjectEditForm
          project={projects[activeProject]}
          cancelHandler={() => {
            setEditProject(false);
          }}
        />
      ) : (
        <ProjectHeader
          editHandler={() => {
            setEditProject(true);
          }}
          deleteHandler={() => {
            setShowAbandonWarning(true);
          }}
        />
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
