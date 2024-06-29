import { RotatingLines } from "react-loader-spinner";

export const TaskCompletingLoader = ({ conditionalStyling }) => {
  return (
    <div className={`w-[1.3rem] flex mr-4 ${conditionalStyling}`}>
      <RotatingLines strokeColor="gray" />
    </div>
  );
};
