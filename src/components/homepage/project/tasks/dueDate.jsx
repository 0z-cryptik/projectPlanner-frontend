import { dueDateHandler } from "../../../../functions/dueDateHandler";

export const DueDate = ({ task }) => {
  return <p className="text-xs">{dueDateHandler(task.dueDate)}</p>;
};
