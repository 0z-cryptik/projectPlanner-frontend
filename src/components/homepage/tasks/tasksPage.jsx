import { useList } from "../../../hooks/stateProvider";
import { SubtaskForm } from "./subtasks/subtaskForm";
import { CreateSubTaskButton } from "./subtasks/createSubTaskButton";
import { SubTaskList } from "./subtasks/subTaskList";

export const TaskPage = () => {
  const { tasks, activeTask, setCreateNewSubTask, createNewSubTask } =
    useList();

  return (
    <section className="w-full h-full pt-5 pl-[4rem]">
      <h1 className="text-3xl w-fit ml-[4rem]">
        {tasks[activeTask].title}
      </h1>
      {tasks[activeTask].subTasks.length > 0 && <SubTaskList />}
      {!createNewSubTask && <CreateSubTaskButton />}
      {createNewSubTask && <SubtaskForm />}
    </section>
  );
};
