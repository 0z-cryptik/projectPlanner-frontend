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
    <button
      onClick={() => {
        setShowForm(true);
      }}
      className={`border-b ml-[4rem] mb-6 w-[57%] pb-1 mt-5 hover:text-orange-600 hover:border-b-orange-600`}>
      add section
    </button>
  );
};
