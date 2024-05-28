import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const PasswordField = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const showPasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row border h-[2.8rem] mb-6 rounded max-lg:outline-[#f7c2dc] lg:border-[#73bfd9] lg:outline-none pl-1">
      <input
        className="h-full px-2 text-sm flex-grow outline-none"
        name="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={passwordChangeHandler}
        required
      />
      {showPassword ? (
        <div
          onClick={showPasswordHandler}
          className="px-2 flex justify-center items-center">
          <IoMdEyeOff />
        </div>
      ) : (
        <div
          onClick={showPasswordHandler}
          className="px-2 flex justify-center items-center">
          <IoMdEye />
        </div>
      )}
    </div>
  );
};
