import { useList } from "../../../../hooks/stateProvider";
import { EachTask } from "./eachTask";

export const TaskList = ({ tasks=[] }) => {
  const { setProjects, fetchFunc } = useList();

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
