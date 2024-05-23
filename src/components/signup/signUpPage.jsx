import Pic from "@/src/assets/6914340.jpg";
import PhonePic from "@/src/assets/1837.jpg";
import { SignUpForm } from "./signUpForm";
import { SettingUpUser } from "../loaders/settingUpUser";
import { useList } from "@/src/hooks/stateProvider";

export const SignUpPage = () => {
  const { processingUser } = useList();

  if (processingUser) {
    return <SettingUpUser />;
  }

  return (
    <main className="flex max-lg:flex-col h-screen">
      <div className="lg:w-1/2 lg:pl-2 lg:py-2">
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
      <SignUpForm />
    </main>
  );
};
