import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

export const CheckMarkButton = ({ clickFunc }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="mr-4 border rounded-full h-[1.5rem] mt-2"
      onClick={clickFunc}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}>
      <IoIosCheckmark
        className={`${!hover && "opacity-0"}`}
        size={"1.3rem"}
      />
    </button>
  );
};
