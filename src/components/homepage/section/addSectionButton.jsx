import { useState } from "react";
import { AddSectionForm } from "./addSectionForm";

export const AddSectionButton = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <AddSectionForm
        hideForm={() => {
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <center className="ml-[4rem] pr-[4rem]">
      <button
        onClick={() => {
          setShowForm(true);
        }}
        className={`border-b mb-6 w-[100%] pb-1 mt-5 text-orange-600 border-b-orange-600`}>
        Add section
      </button>
    </center>
  );
};
