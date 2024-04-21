import { IoIosWarning } from "react-icons/io";
import { useList } from "../../../hooks/stateProvider";

export const AbandonProjectWarning = ({ projectId, cancelHandler }) => {
  const { fetchFunc } = useList();

  const abandonProject = async() => {
    try {
      const { success } = await fetchFunc("/api/project/delete?_method=DELETE", {
        projectId
      });
      if (success) {
        cancelHandler();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[27%] absolute z-20 bg-white border right-[53.5%] p-5 rounded-xl top-[40%]">
      <IoIosWarning
        color="#FFBF00"
        size={"2rem"}
        className="mx-auto"
      />
      <p className="mt-5">
        Are you sure you want to abandon this project?
      </p>
      <div className="w-fit mx-auto mt-5">
        <button
          onClick={cancelHandler}
          className="mr-3 border p-2 rounded bg-green-500 text-white">
          No
        </button>
        <button
          onClick={abandonProject}
          className="border p-2 rounded bg-red-600  text-white">
          Yes
        </button>
      </div>
    </div>
  );
};
