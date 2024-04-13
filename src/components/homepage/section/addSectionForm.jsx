export const AddSectionForm = () => {
  const hideForm = () => {
    setShowForm(false);
  };

  return (
    <form className="ml-[4rem] w-[57%] border mt-5 p-4 rounded-xl">
      <input
        className="outline-none"
        type="text"
        placeholder="enter section name"
        name="section"
        required
      />
      <div className="w-fit ml-auto">
        <button
          onClick={hideForm}
          className="bg-red-600 mr-2 p-2 rounded-xl">
          cancel
        </button>
        <button className="bg-green-500 p-2 rounded-xl">Submit</button>
      </div>
    </form>
  );
};
