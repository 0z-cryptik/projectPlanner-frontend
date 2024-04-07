import { useList } from "../../../hooks/stateProvider";
import { SubtaskForm } from "./subtasks/subtaskForm";
import { CreateSubTaskButton } from "./subtasks/createSubTaskButton";
import { SubTaskList } from "./subtasks/subTaskList";

export const TaskPage = () => {
  const { tasks, activeTask, setCreateNewSubTask, createNewSubTask } =
    useList();

  return (
    <section className="w-full h-full pt-5 pl-[4rem]">
      <div className="flex flex-row border">
        <h1 className="text-3xl w-fit ml-[4rem]">
          {tasks[activeTask].title}
        </h1>
        <p className="text-sm">
          {tasks[activeTask].dueDate
            ? `due on ${new Date(tasks[activeTask].dueDate)}`
            : "due in 3 days"}
        </p>
      </div>
      {tasks[activeTask].subTasks.length > 0 && <SubTaskList />}
      {!createNewSubTask && <CreateSubTaskButton />}
      {createNewSubTask && <SubtaskForm />}
    </section>
  );
};
