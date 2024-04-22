import { dueDateHandler } from "../../../../functions/dueDateHandler";
import { GiSandsOfTime } from "react-icons/gi";

export const DueDate = ({ task }) => {
  return (
    <div className="flex flex-row text-xs gap-x-1">
      <GiSandsOfTime />
      <p>{dueDateHandler(task.dueDate)}</p>
    </div>
  );
};
