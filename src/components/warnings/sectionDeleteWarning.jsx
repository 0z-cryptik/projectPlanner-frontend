import { IoIosWarning } from "react-icons/io";
import { useList } from "../../hooks/stateProvider";
import { useEffect } from "react";

export const DeleteWarning = ({ cancelHandler, deleteHandler }) => {
  const { setFixPage } = useList();

  useEffect(() => {
    setFixPage(true);
    return () => setFixPage(false);
  }, []);

  return (
    <div className="w-[27%] absolute z-20 bg-white border right-[35.5%] top-[40%] p-5 rounded-xl">
      <IoIosWarning
        color="#FFBF00"
        size={"2rem"}
        className="mx-auto"
      />
      <p className="mt-5 text-center">
        Are you sure you want to delete this section?
      </p>
      <div className="w-fit mx-auto mt-5">
        <button
          onClick={cancelHandler}
          className="mr-3 border p-2 rounded bg-green-500 text-white">
          cancel
        </button>
        <button
          onClick={deleteHandler}
          className="border p-2 rounded bg-red-600 text-white">
          delete
        </button>
      </div>
    </div>
  );
};
