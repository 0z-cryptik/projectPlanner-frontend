import { PiYinYangFill } from "react-icons/pi";
import { useList } from "../../hooks/stateProvider";

export const ChangeThemeButton = () => {
  const { darkMode, setDarkMode } = useList();

  return (
    <center>
      <button
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        className="mt-2">
        <PiYinYangFill size={"1.5rem"} />
      </button>
    </center>
  );
};
