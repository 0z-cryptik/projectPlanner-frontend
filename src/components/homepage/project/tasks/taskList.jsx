import { EachTask } from "./eachTask";
import { motion } from "framer-motion";

export const TaskList = ({ tasks = [] }) => {
  return (
    <section
      
      className="lg:ml-[4rem] ml-6">
      {tasks.map((task, i) => (
        <EachTask
          task={task}
          key={i}
        />
      ))}
    </section>
  );
};
