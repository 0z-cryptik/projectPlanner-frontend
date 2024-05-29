import { useList } from "../../../hooks/stateProvider";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { GoSidebarCollapse } from "react-icons/go";
import { PhoneSideBarForm } from "./phoneSideBarForm";

export const CreateNewProjectButton = () => {
  const { setCreatingNewProject, setShowMenu } = useList();

  return (
    <section className={`w-full h-full flex items-center justify-center`}>
      <button
        className="absolute left-0 top-2 lg:hidden"
        onClick={() => {
          setShowMenu(true);
        }}>
        <GoSidebarCollapse
          className="mx-3"
          size={"1.5rem"}
        />
      </button>
      <div>
        <button
          className="bg-orange-400 text-white px-3 rounded-xl"
          onClick={() => {
            setCreatingNewProject(true);
          }}>
          Create a new project +
        </button>
      </div>
    </section>
  );
};

export const SideBarNewProjectButton = () => {
  const { setCreatingNewProject, creatingNewProject } = useList();

  return (
    <>
      <button
        disabled={creatingNewProject ? true : false}
        onClick={() => {
          setCreatingNewProject(true);
        }}
        className="lg:flex flex-row mt-5 text-green-600 text-sm pl-2 hidden">
        <HiMiniSquaresPlus className="mr-2 mt-[0.1rem]" />
        Add new project
      </button>
    </>
  );
};

export const PhoneSideBarNewProjectButton = () => {
  const { showPhoneForm, setShowPhoneForm } = useList();

  if (showPhoneForm) {
    return <PhoneSideBarForm />;
  }

  return (
    <button
      onClick={() => {
        setShowPhoneForm(true);
      }}
      className="lg:hidden flex flex-row mt-5 text-green-600 text-sm pl-2">
      <HiMiniSquaresPlus className="mr-2 mt-[0.1rem]" />
      Add new project
    </button>
  );
};
