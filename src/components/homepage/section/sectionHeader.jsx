import { SlOptions } from "react-icons/sl";

export const SectionHeader = ({ section, clickHandler }) => {
  return (
    <div className="w-[62%] pl-2 py-2 flex flex-row">
      <h1 className="flex-grow">{section.title}</h1>
      <button
        onClick={clickHandler}>
        <SlOptions />
      </button>
    </div>
  );
};
