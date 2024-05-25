import { LoginForm } from "./loginForm";
import { LoggingInUser } from "../loaders/loggingInUser";
import { useList } from "@/src/hooks/stateProvider";
import Pic from "@/src/assets/6376174.jpg";
import PhonePic from "@/src/assets/6262501.jpg";

export const LoginPage = () => {
  const { loggingInUser } = useList();

  if (loggingInUser) {
    return <LoggingInUser />;
  }

  return (
    <main className="flex max-lg:flex-col h-screen">
      <LoginForm />
      <div className="lg:w-1/2 lg:pl-2 lg:py-2 order-1 lg:order-2">
        <img
          className="hidden lg:flex h-full rounded-md"
          src={Pic}
          alt="An illustration that depicts someone working"
        />

        <img
          className="w-screen lg:hidden"
          src={PhonePic}
          alt="An illustration that depicts a workspace"
        />
      </div>
    </main>
  );
};
