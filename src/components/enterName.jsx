import { useState } from "react";
import { useNavigate } from "react-router";
import { useList } from "../hooks/stateProvider";
import { NameSubmitError } from "./errorPages/nameSubmitError";
import { SubmitName } from "./submitName";
import { SettingUpUser } from "./loaders/settingUpUser";

export const EnterName = () => {
  const [error, setError] = useState(false);
  const [processingUser, setProcessingUser] = useState(false);
  const { signUpUser, setUser, password } = useList();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const data2submit = {
      name: form.get("name"),
      userID: signUpUser._id,
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${form.get(
        "name"
      )}`
    };

    try {
      setProcessingUser(true);
      const res = await fetch("/api/user/signup/submitName", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      console.log(response);

      if (response.data) {
        const { email } = response.data;
        const loginRes = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" }
        });

        const loginResponse = await loginRes.json();
        console.log(loginResponse);

        if (loginResponse.success) {
          setUser(loginResponse.user);
          setProcessingUser(false);
          navigate("/");
        } else {
          setError(true);
          setProcessingUser(false);
        }
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  if (processingUser) {
    return <SettingUpUser />;
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <center className="w-[38%] h-fit border py-5">
        <SubmitName submitFunc={submitHandler} />
        {error && <NameSubmitError />}
      </center>
    </main>
  );
};
