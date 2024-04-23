import { dueDateHandler } from "../../../../functions/dueDateHandler";
import { GiSandsOfTime } from "react-icons/gi";

export const DueDate = ({ task }) => {
  return (
    <div className="flex flex-row text-xs gap-x-1 mt-2 text-[#2C8C99]">
      <GiSandsOfTime className="mt-[1px]" />
      <p>{dueDateHandler(task.dueDate)}</p>
    </div>
  );
};
