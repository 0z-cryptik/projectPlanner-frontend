import { SlOptions } from "react-icons/sl";

export const SectionHeader = ({ section, clickHandler, optionsOpen }) => {
  return (
    <div className="w-[90%]  flex flex-row -mb-3">
      <h1 className="flex-grow text-base lg:text-xl font-bold lg:font-semibold">
        {section.title}
      </h1>
      <button
        className={`ml-3 px-3  ${optionsOpen && "bg-gray-100 rounded-xl"}`}
        onClick={clickHandler}>
        <SlOptions />
      </button>
    </div>
  );
};
