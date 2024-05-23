import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

export const CheckMarkButton = ({ clickFunc, additionalStyling = "" }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`mr-4 border rounded-full h-[1.5rem] ${
        additionalStyling === "mb-2" ? "mb-2" : "mt-2"
      }`}
      onClick={clickFunc}
      onMouseOver={(e) => {
        e.stopPropagation();
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
