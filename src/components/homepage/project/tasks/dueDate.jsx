import { GiSandsOfTime } from "react-icons/gi";

export const DueDate = ({ date }) => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const calculateDaysDifference = (current, target) => {
    const differenceInMs = target.getTime() - current.getTime();
    // Convert milliseconds to days
    return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  };

  const daysDifference = calculateDaysDifference(currentDate, targetDate);

  if (daysDifference === 0) {
    return (
      <div className="flex flex-row text-[0.6rem] lg:text-xs gap-x-1 mt-2 text-red-600">
        <GiSandsOfTime className="mt-[1px]" />
        <p>Today</p>
      </div>
    );
  } else if (daysDifference === 1) {
    return (
      <div className="flex flex-row text-[0.6rem] lg:text-xs gap-x-1 mt-2 text-[#2C8C99]">
        <GiSandsOfTime className="mt-[1px]" />
        <p>{daysDifference} day</p>
      </div>
    );
  } else if (daysDifference > 1) {
    return (
      <div className="flex flex-row text-[0.6rem] lg:text-xs gap-x-1 mt-2 text-[#2C8C99]">
        <GiSandsOfTime className="mt-[1px]" />
        <p>{daysDifference} days</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row text-[0.6rem] lg:text-xs gap-x-1 mt-2 text-red-600">
        <GiSandsOfTime className="mt-[1px]" />
        <p>Past due</p>
      </div>
    );
  }
};
