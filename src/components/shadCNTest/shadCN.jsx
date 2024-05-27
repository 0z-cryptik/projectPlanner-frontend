import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "./datePicker";
import { ProfileForm } from "./formTest";
import { PasswordForm } from "./confirmPasswordTest";

export const ShadCNPage = () => {
  return (
    <main>
      <Button>Click me</Button>
      <DatePicker />
      <ProfileForm />
      <PasswordForm />
    </main>
  );
};
