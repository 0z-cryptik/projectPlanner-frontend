import { PiYinYangFill } from "react-icons/pi";
import { useList } from "../../hooks/stateProvider";
import { motion } from "framer-motion";

export const ChangeThemeButton = () => {
  const { darkMode, setDarkMode, creatingNewProject } = useList();

  return (
    <center>
      <motion.button
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        whileTap={{ rotate: 180 }}
        className="mt-2"
        >
        <PiYinYangFill size={"1.5rem"} />
      </motion.button>
    </center>
  );
};
