import { RotatingLines } from "react-loader-spinner";

export const TaskCompletingLoader = () => {
  return (
    <div className="w-[1.3rem] flex">
      <RotatingLines strokeColor="gray" />
    </div>
  );
};