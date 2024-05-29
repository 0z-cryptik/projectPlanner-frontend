import { useState } from "react";
import { TaskList } from "../project/tasks/taskList";
import { TaskForm } from "./newTaskFormForSections";
import { CreateTaskButton } from "../project/tasks/createTaskButton";
import { useList } from "../../../hooks/stateProvider";
import { EditSectionForm } from "./editSectionForm";
import { DeleteWarning } from "../../warnings/sectionDeleteWarning";
import { Overlay } from "../../overlay/overlay";
import { SectionHeader } from "./sectionHeader";
import { Options } from "./options";

export const EachSection = ({ section }) => {
  const [createTask, setCreateTask] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const { fetchFunc, setError, user, server } = useList();

  const deleteFunc = () => {
    try {
      fetchFunc(`${server}/api/section/delete?_method=DELETE&apiToken=${user.apiToken}`, {
        sectionId: section._id
      });
    } catch (err) {
      setError(
        "An error occured while deleting your section, please try again"
      );
    }
  };

  return (
    <section className="mt-7">
      <div className="text-xl lg:ml-[4rem] ml-6">
        <div className="flex flex-row">
          {!editSection && (
            <SectionHeader
              section={section}
              clickHandler={() => {
                setShowOptions(!showOptions);
              }}
              optionsOpen={showOptions}
            />
          )}
        </div>

        {showOptions && (
          <>
            <Options
              deleteButtonHandler={() => {
                setShowDeleteWarning(true);
                setShowOptions(false);
              }}
              editButtonHandler={() => {
                setEditSection(true);
                setShowOptions(false);
              }}
              showOptions={showOptions}
            />
            <Overlay
              clickHandler={() => {
                setShowOptions(false);
              }}
            />
          </>
        )}
        {showDeleteWarning && (
          <>
            <DeleteWarning
              cancelHandler={() => {
                setShowDeleteWarning(false);
              }}
              deleteHandler={() => {
                deleteFunc();
                setShowDeleteWarning(false);
              }}
            />
            <Overlay deem={true} />
          </>
        )}
        {editSection && (
          <EditSectionForm
            section={section}
            hideForm={() => {
              setEditSection(false);
            }}
          />
        )}
      </div>
      <div>
        <TaskList tasks={section.tasks} />
        {!createTask && (
          <CreateTaskButton
            clickHandler={() => {
              setCreateTask(true);
            }}
          />
        )}
        {createTask && (
          <TaskForm
            hideForm={() => {
              setCreateTask(false);
            }}
            parentSection={section._id}
          />
        )}
      </div>
    </section>
  );
};
