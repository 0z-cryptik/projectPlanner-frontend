import { useList } from "../../hooks/stateProvider";

export const TaskList = () => {
  const { tasks } = useList();

  return (
    <>
      <p className="font-bold mt-5">My tasks</p>

      {tasks.map((task, i) => {
        return (
          <div
            key={i}
            className="mt-3 cursor-pointer">
            <p>{task.title}</p>
          </div>
        );
      })}
    </>
  );
};
