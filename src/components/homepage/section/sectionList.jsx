import { TaskList } from "../project/tasks/taskList";
import { useList } from "../../../hooks/stateProvider";
import { useState } from "react";
import { TaskForm } from "../project/tasks/newTaskForm";
import { CreateTaskButton } from "../project/tasks/createTaskButton";
import { EachSection } from "./eachSection";

export const SectionList = ({ sections }) => {
  const [createTask, setCreateTask] = useState(false);
  const { setProjects } = useList();

  return (
    <section>
      {sections.map((section, i) => {
        return (
          <EachSection
            section={section}
            key={i}
          />
        );
      })}
    </section>
  );
};
