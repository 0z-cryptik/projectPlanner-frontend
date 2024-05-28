import { PiUserSquareFill } from "react-icons/pi";
import { Img } from "react-image";
import { Skeleton } from "@/components/ui/skeleton";

export const Avatar = ({ user }) => {
  return (
    <Img
      className="w-[7rem] h-[7rem] mx-auto border-2 rounded-xl mb-3"
      src={user.avatar}
      loader={
        <Skeleton className="w-[7rem] h-[7rem] mx-auto border-2 rounded-xl mb-3" />
      }
    />
  );
};
