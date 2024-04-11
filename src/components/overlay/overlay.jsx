export const Overlay = ({ clickHandler, deem = false }) => {
  return (
    <div
      onClick={clickHandler}
      className={`fixed top-0 left-0 w-full h-full bg-black z-10 ${
        deem ? "bg-opacity-50" : "opacity-0"
      }`}></div>
  );
};
