export const TaskFormButton = ({ text, clickFunc }) => {
  return (
    <button
      className="bg-orange-500 p-2 rounded-xl text-white"
      onClick={clickFunc}>
      {text}
    </button>
  );
};
