import { useState } from "react";
import { useList } from "../../../hooks/stateProvider";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { CreateNewProjectForm } from "./newProjectForm";

export const CreateNewProjectButton = () => {
  const { setCreatingNewProject } = useList();

  return (
    <section className={`w-full h-full flex items-center justify-center`}>
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
    return <CreateNewProjectForm />;
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
