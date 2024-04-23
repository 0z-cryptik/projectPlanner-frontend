import { Oval } from "react-loader-spinner";

export const ProjectLoader = () => {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <Oval
        color="#808080"
        secondaryColor="rgb(156, 163, 175)"
      />
    </section>
  );
};
