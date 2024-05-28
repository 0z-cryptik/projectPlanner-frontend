import { SlOptions } from "react-icons/sl";
import { useList } from "@/src/hooks/stateProvider";

export const SectionHeader = ({ section, clickHandler, optionsOpen }) => {
  const { darkMode } = useList();

  return (
    <div className="w-[90%]  flex flex-row -mb-3">
      <h1 className="flex-grow text-base lg:text-xl font-bold lg:font-semibold">
        {section.title}
      </h1>
      <button
        className={`ml-3 px-3 ${
          optionsOpen && !darkMode && "bg-gray-100"
        } ${optionsOpen && darkMode && "bg-[#1b263b]"} rounded-xl`}
        onClick={clickHandler}>
        <SlOptions />
      </button>
    </div>
  );
};
