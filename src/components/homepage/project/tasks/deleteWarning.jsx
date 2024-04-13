export const DeleteWarning = ({ cancelHandler, deleteHandler }) => {
  return (
    <div className="w-[27%] absolute z-20 bg-white border right-[36.5%] p-5 rounded-xl">
      <p>Are you sure you want to delete this task?</p>
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
    </div>
  );
};
