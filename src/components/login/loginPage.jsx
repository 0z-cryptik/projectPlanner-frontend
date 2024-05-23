import { LoginForm } from "./loginForm";
import { LoggingInUser } from "../loaders/loggingInUser";
import { useList } from "@/src/hooks/stateProvider";
import Pic from "@/src/assets/4888301.jpg";

export const LoginPage = () => {
  const { loggingInUser } = useList();

  if (loggingInUser) {
    return <LoggingInUser />;
  }

  return (
    <main className="flex">
      <LoginForm />
      <div className="w-1/2 pr-2 py-2">
        <img
          className="h-full rounded-md"
          src={Pic}
          alt="An illustration that depicts someone working"
        />
      </div>
    </main>
  );
};
