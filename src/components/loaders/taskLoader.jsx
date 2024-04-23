import { ThreeDots } from "react-loader-spinner";

export const TaskLoader = () => {
  return (
    <div className="flex items-center justify-center ml-[4rem] w-[60%]">
      <ThreeDots
        color="#808080"
        width={"50"}
      />
    </div>
  );
};
