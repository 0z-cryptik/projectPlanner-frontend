import { useList } from "../../../hooks/stateProvider";
import { LiaProjectDiagramSolid } from "react-icons/lia";

export const ProjectList = () => {
  const { projects, activeProject, setActiveProject } = useList();

  return (
    <>
      {projects.map((project, i) => {
        return (
          <div
            key={i}
            className={`mt-3 cursor-pointer flex flex-row text-sm p-2 whitespace-nowrap ${
              activeProject === i && "bg-[#cbcbd4] text-black rounded-xl"
            }`}
            onClick={() => {
              setActiveProject(i);
            }}>
            <LiaProjectDiagramSolid className="mt-1 mr-3" />
            <p className="w-[80%] text-ellipsis overflow-clip">
              {project.title}
            </p>
          </div>
        );
      })}
    </>
  );
};
