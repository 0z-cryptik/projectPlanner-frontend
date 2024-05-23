import Pic from "@/src/assets/6914340.jpg";
import { SignUpForm } from "./signUpForm";
import { SettingUpUser } from "../loaders/settingUpUser";
import { useList } from "@/src/hooks/stateProvider";

export const SignUpPage = () => {
  const { processingUser } = useList();
  
  if (processingUser) {
    return <SettingUpUser />;
  }

  return (
    <main className="flex">
      <div className="w-1/2 pl-2 py-2">
        <img
          className="h-full rounded-md"
          src={Pic}
          alt="An illustration that depicts someone working"
        />
      </div>
      <SignUpForm />
    </main>
  );
};
