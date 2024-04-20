import { useState } from "react";
import { TaskList } from "../project/tasks/taskList";
import { TaskForm } from "../project/tasks/newTaskForm";
import { CreateTaskButton } from "../project/tasks/createTaskButton";
import { useList } from "../../../hooks/stateProvider";
import { EditSectionForm } from "./editSectionForm";
import { DeleteWarning } from "./deleteWarning";
import { Overlay } from "../../overlay/overlay";
import { SectionHeader } from "./sectionHeader";
import { Options } from "./options";

export const EachSection = ({ section, key }) => {
  const [createTask, setCreateTask] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const { fetchFunc } = useList();

  const deleteFunc = () => {
    try {
      fetchFunc("/api/section/delete?_method=DELETE", {
        sectionId: section._id
      });
    } catch (err) {
      console.error(err);
    }
  };

  const submitFunc = (e) => {
    const form = new FormData(e.target);

    const data2submit = {
      title: form.get("title"),
      parentSection: section._id,
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
      key={key}
      className="mt-7">
      <div className="text-xl ml-[4rem]">
        {!editSection && (
          <SectionHeader
            section={section}
            clickHandler={() => {
              setShowOptions(!showOptions);
            }}
          />
        )}

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
          submitHandler={submitFunc}
        />
      )}
    </section>
  );
};
