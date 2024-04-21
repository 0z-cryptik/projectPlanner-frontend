import { EachTask } from "./eachTask";

export const TaskList = ({ tasks = [] }) => {
  return (
    <section className="ml-[4rem]">
      {tasks.map((task, i) => (
        <EachTask
          task={task}
          i={i}
        />
      ))}
    </section>
  );
};
