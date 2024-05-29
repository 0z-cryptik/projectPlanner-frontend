import { IoIosWarning } from "react-icons/io";
import { useList } from "../../hooks/stateProvider";
import { useEffect, useState, createRef } from "react";
import { motion } from "framer-motion";

export const DeleteWarning = ({ cancelHandler, deleteHandler }) => {
  const [topPosition, setTopPosition] = useState(0);
  const fixedElementRef = createRef();

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const fixedElementHeight = fixedElementRef.current.clientHeight;
      const newTopPosition = (windowHeight - fixedElementHeight) / 2;
      setTopPosition(newTopPosition);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      ref={fixedElementRef}
      style={{ top: `${topPosition}px` }}
      className="max-md:w-[70%] md:w-[40%] lg:w-[27%] absolute z-20 text-xs lg:text-base bg-white text-black border max-md:left-[15%] max-lg:left-[30%] lg:right-[36.5%] p-5 rounded-xl">
      <IoIosWarning
        color="#FFBF00"
        size={"2rem"}
        className="mx-auto"
      />
      <p className="mt-5 text-center">
        Are you sure you want to delete this section?
      </p>
      <div className="w-fit mx-auto mt-5">
        <button
          onClick={cancelHandler}
          className="mr-3 border p-2 rounded bg-green-500 text-white">
          cancel
        </button>
        <button
          onClick={deleteHandler}
          className="border p-2 rounded bg-red-600 text-white">
          delete
        </button>
      </div>
    </motion.div>
  );
};
