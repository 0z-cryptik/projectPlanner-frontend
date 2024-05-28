import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const PasswordField = ({ field }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row border h-[2.8rem] mb-6 rounded outline-[#afafef] lg:border-[#cdd6fe] lg:outline-none lg:border-2 pl-1">
      <input
        {...field}
        className="h-full px-2 text-sm flex-grow outline-none"
        name="password"
        type={showPassword ? "text" : "password"}
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
