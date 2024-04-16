import { useState } from "react";
import { TaskList } from "../project/tasks/taskList";
import { TaskForm } from "../project/tasks/newTaskForm";
import { CreateTaskButton } from "../project/tasks/createTaskButton";
import { useList } from "../../../hooks/stateProvider";
import { EditSectionForm } from "./editSectionForm";
import { MdEdit } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { DeleteWarning } from "./deleteWarning";
import { Overlay } from "../../overlay/overlay";

export const EachSection = ({ section, key }) => {
  const [createTask, setCreateTask] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const { setProjects } = useList();

  const deleteFunc = async () => {
    try {
      const res = await fetch("/api/section/delete?_method=DELETE", {
        method: "POST",
        body: JSON.stringify({ sectionId: section._id }),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();

      console.log(response);

      if (response.success) {
        setProjects(response.user.projects);
      }
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
          <div className="w-[62%] pl-2 py-2 flex flex-row">
            <h1 className="flex-grow">{section.title}</h1>
            <button
              onClick={() => {
                setShowOptions(!showOptions);
              }}>
              <SlOptions />
            </button>
          </div>
        )}

        {showOptions && (
          <div
            className={`border rounded-xl w-fit p-3 absolute bg-white z-20 left-[63%] ${
              !showOptions && "hidden"
            }`}>
            <button
              onClick={() => {
                setEditSection(true);
                setShowOptions(false);
              }}
              className="border-b flex flex-row gap-x-1">
              Edit
              <MdEdit
                className="mt-[5px]"
                size={"0.8rem"}
              />
            </button>
            <button
              onClick={() => {
                setShowDeleteWarning(true);
                setShowOptions(false);
              }}
              className="flex flex-row gap-x-1 text-red-600 mt-2">
              Delete
              <RiDeleteBin7Fill className="mt-[5px]" />
            </button>
          </div>
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
          submitHandler={async (e) => {
            const form = new FormData(e.target);

            const data2submit = {
              title: form.get("title"),
              parentSection: section._id,
              dueDate: form.get("date")
            };

            try {
              const res = await fetch("/api/task/create", {
                method: "POST",
                body: JSON.stringify(data2submit),
                headers: { "Content-Type": "application/json" }
              });

              const response = await res.json();
              console.log(response);

              if (response.success) {
                setProjects(response.user.projects);
              }
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </section>
  );
};
