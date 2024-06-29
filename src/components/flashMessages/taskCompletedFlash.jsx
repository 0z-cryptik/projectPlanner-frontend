import { useList } from "@/src/hooks/stateProvider";

export const TaskCompleted = () => {
  const { setCompleted } = useList();

  setTimeout(() => {
    setCompleted(false);
  }, 1500);

  return (
    <div className="rounded-xl bg-green-500 text-white fixed py-5 px-3 top-[90%] right-1 text-sm">
      <p>Task completed</p>
    </div>
  );
};