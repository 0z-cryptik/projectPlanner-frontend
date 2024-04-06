import { useList } from "../../../hooks/stateProvider";
import { CiSquarePlus } from "react-icons/ci";
import { SubtaskForm } from "./subtasks/subtaskForm";

export const TaskPage = () => {
  const { tasks, activeTask, setCreateNewSubTask, createNewSubTask } =
    useList();

  return (
    <section className="w-full h-full pt-5 pl-[4rem]">
      <h1 className="text-3xl w-fit ml-[4rem]">
        {tasks[activeTask].title}
      </h1>
      {tasks[activeTask].subTasks.length > 0 && (
        <div className="ml-[4rem]">
          {tasks[activeTask].subTasks.map((subTask, i) => {
            return <p key={i}>{subTask.title}</p>;
          })}
        </div>
      )}
      {!createNewSubTask && (
        <button
          onClick={() => {
            setCreateNewSubTask(true);
          }}
          className="flex flex-row border-b pl-4 pr-6 pb-2 mt-4 gap-x-2 hover:text-orange-500 hover:border-b-orange-500">
          <CiSquarePlus size={"1.5rem"} />
          Add subtask
        </button>
      )}
      {createNewSubTask && <SubtaskForm />}
    </section>
  );
};
