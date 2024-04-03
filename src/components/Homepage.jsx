import { useList } from "../hooks/stateProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

export const Homepage = () => {
  const { user } = useList();

  return (
    <main className="w-screen h-screen flex flex-row">
      <nav className="w-1/5 h-full border-r p-4 bg-[#605770] text-white">
        <div className="flex flex-row">
          <FaRegCircleUser
            size={"1.5rem"}
            className="mr-3"
          />
          {user.name}
        </div>
        <button className="mt-2 text-sm text-orange-500">logout</button>

        <div className="flex flex-row mt-5">
          <IoAddCircleOutline
            size={"1.4rem"}
            className="mr-2"
          />
          Add task
        </div>

        <p className="font-bold mt-5">My tasks</p>

        <div className="mt-3">
          <p>task 1</p>
          <p>task 2</p>
          <p>task 3</p>
        </div>
      </nav>

      <section
        className={`w-full h-full flex items-center justify-center`}>
        <div>
          <button className="bg-orange-400 text-white px-3 rounded-xl">
            Create a new task +
          </button>
        </div>
      </section>
    </main>
  );
};

//render name using signUpUser or currentUser
//find a technology that generates random avatars and use those for dp
