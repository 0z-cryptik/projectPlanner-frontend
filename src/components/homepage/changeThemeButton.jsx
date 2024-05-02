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
        className="p-1 border rounded-xl mt-3 text-sm flex flex-row hover:text-white hover:bg-black">
        Change theme
        <PiYinYangFill className="mt-[0.15rem] ml-1" />
      </button>
    </center>
  );
};
