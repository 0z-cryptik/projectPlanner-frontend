import { useList } from "../../../hooks/stateProvider";
import { SubtaskForm } from "./subtasks/subtaskForm";
import { CreateSubTaskButton } from "./subtasks/createSubTaskButton";
import { SubTaskList } from "./subtasks/subTaskList";
import { MdEdit } from "react-icons/md";
import { TaskEditForm } from "./taskEditForm";
import { AddSectionButton } from "../section/addSectionButton";

export const TaskPage = () => {
  const {
    tasks,
    activeTask,
    createNewSubTask,
    setEditTask,
    editTask
  } = useList();

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
            <button
              onClick={() => {
                setEditTask(true);
              }}
              className="ml-6 mr-3 hidden">
              <MdEdit size={"1.5rem"} />
            </button>
          </>
        )}
      </div>
      {tasks[activeTask].subTasks.length > 0 && <SubTaskList />}
      {!createNewSubTask && <CreateSubTaskButton />}
      {createNewSubTask && <SubtaskForm />}
      <AddSectionButton />
    </section>
  );
};
