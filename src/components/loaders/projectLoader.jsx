import { Oval } from "react-loader-spinner";

export const ProjectLoader = () => {
  return (
    <>
      <section className="w-full h-full hidden lg:flex items-center justify-center">
        <Oval
          color="#808080"
          secondaryColor="rgb(156, 163, 175)"
        />
      </section>

      <section className="lg:hidden w-fit mx-auto">
        <Oval
          width={"2.5rem"}
          color="#808080"
          secondaryColor="rgb(156, 163, 175)"
        />
      </section>
    </>
  );
};
