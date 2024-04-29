import { useEffect, useState } from "react";
import { TaskList } from "../project/tasks/taskList";
import { TaskForm } from "../project/tasks/newTaskForm";
import { CreateTaskButton } from "../project/tasks/createTaskButton";
import { useList } from "../../../hooks/stateProvider";
import { EditSectionForm } from "./editSectionForm";
import { DeleteWarning } from "../../warnings/sectionDeleteWarning";
import { Overlay } from "../../overlay/overlay";
import { SectionHeader } from "./sectionHeader";
import { Options } from "./options";
import { TaskLoader } from "../../loaders/taskLoader";

export const EachSection = ({ section }) => {
  const [createTask, setCreateTask] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { fetchFunc, setError } = useList();

  const deleteFunc = () => {
    try {
      fetchFunc("/api/section/delete?_method=DELETE", {
        sectionId: section._id
      });
    } catch (err) {
      setError(
        "An error occured while deleting your section, please try again"
      );
    }
  };

  const submitFunc = async (e) => {
    setShowLoader(true);
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      parentSection: section._id,
      dueDate: form.get("date")
    };

    try {
      const { success } = await fetchFunc("/api/task/create", data2submit);

      if (success) {
        setShowLoader(false);
      } else {
        setError(
          "An error occured while creating your task, please try again"
        );
      }
    } catch (err) {
      setError(
        "An error occured while creating your task, please try again"
      );
      setShowLoader(false);
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
        {createTask && !showLoader && (
          <TaskForm
            hideForm={() => {
              setCreateTask(false);
            }}
            submitHandler={submitFunc}
          />
        )}

        {showLoader && <TaskLoader />}
      </div>
    </section>
  );
};
