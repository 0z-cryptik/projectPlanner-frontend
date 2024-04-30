import { useList } from "../../hooks/stateProvider";

export const Overlay = ({ clickHandler, deem = false }) => {
  const { showMenu, setShowMenu } = useList();

  return (
    <div
      onClick={() => {
        if (showMenu) {
          setShowMenu(false);
        }
        clickHandler();
      }}
      className={`fixed top-0 left-0 w-screen h-screen bg-black z-10 ${
        deem ? "bg-opacity-50" : "opacity-0"
      }`}></div>
  );
};
