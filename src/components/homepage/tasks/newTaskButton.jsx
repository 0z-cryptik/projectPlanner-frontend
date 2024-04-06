import { useList } from "../../../hooks/stateProvider";

export const CreateNewTaskButton = () => {
  const { setCreatingNewtask } = useList();

  return (
    <section className={`w-full h-full flex items-center justify-center`}>
      <div>
        <button
          className="bg-orange-400 text-white px-3 rounded-xl"
          onClick={() => {
            setCreatingNewtask(true)
          }}>
          Create a new task +
        </button>
      </div>
    </section>
  );
};
