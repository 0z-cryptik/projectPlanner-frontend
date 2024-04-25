import { PiUserSquareFill } from "react-icons/pi";

export const Avatar = ({ user }) => {
  if (user.avatar) {
    return (
      <img
        className="w-[7rem] h-[7rem] mx-auto border-2 rounded-xl mb-3"
        src={user.avatar}
      />
    );
  } else {
    return (
      <PiUserSquareFill
        className="mx-auto"
        size={"7rem"}
      />
    );
  }
};
