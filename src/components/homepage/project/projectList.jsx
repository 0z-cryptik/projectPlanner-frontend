import { useList } from "../../../hooks/stateProvider";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoCheckbox } from "react-icons/io5";
import { LiaProjectDiagramSolid } from "react-icons/lia";

export const ProjectList = () => {
  const { projects, activeProject, setActiveProject } = useList();

  return (
    <>
      {projects.map((project, i) => {
        return (
          <div
            key={i}
            className={`mt-3 cursor-pointer flex flex-row text-sm p-2 ${
              activeProject === i ? "bg-[#B2B1CF] text-black rounded-xl" : ""
            }`}
            onClick={() => {
              setActiveProject(i);
            }}>
            <LiaProjectDiagramSolid className="mt-1 mr-3" />
            <p className="w-1/2">{project.title}</p>
          </div>
        );
      })}
    </>
  );
};
