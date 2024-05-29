import { Oval } from "react-loader-spinner";

export const LandingPageLoader = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <Oval
        color="black"
        secondaryColor="gray"
      />
    </main>
  );
};
