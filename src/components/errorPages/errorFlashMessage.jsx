import { MdCancel } from "react-icons/md";
import { useList } from "../../hooks/stateProvider";

export const ErrorFlashMessage = ({ message }) => {
  const { setError } = useList();

  return (
    <div className="rounded-xl bg-red-600 text-white fixed py-5 px-3 top-[90%] right-1 text-xs flex flex-row gap-x-2">
      <button
        onClick={() => {
          setError("");
        }}>
        <MdCancel />
      </button>
      <p>{message}</p>
    </div>
  );
};
