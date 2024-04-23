import { ThreeDots } from "react-loader-spinner";

export const SectionLoader = () => {
  return (
    <div className="ml-[4rem] w-[60%] flex items-center justify-center">
      <ThreeDots
        color="#808080"
        width={"80"}
      />
    </div>
  );
};
