import { useList } from "../../../hooks/stateProvider";
import { SubtaskForm } from "./subtasks/subtaskForm";
import { CreateSubTaskButton } from "./subtasks/createSubTaskButton";
import { SubTaskList } from "./subtasks/subTaskList";
import { dueDateHandler } from "../../../functions/dueDateHandler";
import { IoCheckbox } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { TaskEditForm } from "./taskEditForm";

export const TaskPage = () => {
  const {
    tasks,
    activeTask,
    setCreateNewSubTask,
    createNewSubTask,
    setTasks,
    setActiveTask,
    setCreatingNewTask,
    setEditTask,
    editTask
  } = useList();

  const completed = async (id) => {
    const res = await fetch("/api/task/delete?_method=DELETE", {
      method: "POST",
      body: JSON.stringify({ taskId: id }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await res.json();
    console.log(response);

    if (response.success) {
      setTasks(response.user.tasks);
      if (tasks.length > 0) {
        setActiveTask(0);
      } else {
        setCreatingNewTask(true);
      }
    }
  };

  return (
    <section className="w-full h-full pt-5 px-[4rem]">
      <div className="flex flex-row border-b pb-5">
        {editTask ? (
          <TaskEditForm />
        ) : (
          <h1 className="text-3xl w-fit ml-[4rem]">
            {tasks[activeTask].title}
          </h1>
        )}

        {!editTask && (
          <>
            <div className="ml-auto flex flex-row gap-x-2 mr-5">
              <button
                onClick={() => {
                  completed(tasks[activeTask]._id);
                }}
                className="flex flex-row border p-2 text-sm gap-x-1">
                Completed
                <IoCheckbox />
              </button>
              <button className="flex flex-row border p-2 text-sm gap-x-1">
                Delete
                <RiDeleteBin7Fill />
              </button>
            </div>

            <p className="text-sm border">
              {tasks[activeTask].dueDate
                ? dueDateHandler(tasks[activeTask].dueDate)
                : "due in 3 days"}
            </p>

            <button
              onClick={() => {
                setEditTask(true);
              }}
              className="ml-6 mr-3">
              <MdEdit size={"1.5rem"} />
            </button>
          </>
        )}
      </div>
      {tasks[activeTask].subTasks.length > 0 && <SubTaskList />}
      {!createNewSubTask && <CreateSubTaskButton />}
      {createNewSubTask && <SubtaskForm />}
    </section>
  );
};
