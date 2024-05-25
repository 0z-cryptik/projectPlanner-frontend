import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const PasswordField = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row border h-[2.8rem] mb-6 rounded active:outline">
      <input
        className="h-full px-2 text-sm flex-grow outline-none"
        name="password"
        type="password"
        value={password}
        onChange={passwordChangeHandler}
        required
      />
      {showPassword ? (
        <button
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="px-2">
          <IoMdEyeOff />
        </button>
      ) : (
        <button
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="px-2">
          <IoMdEye />
        </button>
      )}
    </div>
  );
};
