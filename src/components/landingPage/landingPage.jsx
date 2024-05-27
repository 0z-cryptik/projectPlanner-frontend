import heroImage from "./images/3682888.jpg";
import logo from "./images/logo/task-list-2.png";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <nav className="w-full flex flex-row p-3 lg:order-1">
        <p className="flex-grow">
          <img
            className="w-[3.5rem] ml-5"
            src={logo}
          />
        </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mr-3 hover:bg-gray-200 px-3 max-md:text-xs md:font-bold rounded-xl">
          Login
        </button>
        <motion.button
          onClick={() => {
            navigate("/signup");
          }}
          whileHover={{ scale: 1.1 }}
          className="border rounded-xl bg-gradient-to-b hover:bg-gradient-to-t from-[#0cb2ff] to-[#4e61ff] text-white p-3 max-md:text-xs">
          Get started
        </motion.button>
      </nav>

      <section className="flex flex-col mt-[5rem] md:mt-[3rem] lg:order-3">
        <div className="text-center flex flex-col items-center max-md:order-2 justify-center">
          <h1 className="text-4xl md:text-6xl md:w-[70%] font-bold mt-[4rem] lg:mt-[1rem] max-md:px-3">
            Organize your work and projects today
          </h1>
          <p className="w-[70%] text-lg mt-5">
            Break down your projects into tasks, group your tasks into
            different sections
          </p>

          <motion.button
            onClick={() => {
              navigate("/signup");
            }}
            whileHover={{ scale: 1.1 }}
            className="border rounded-xl bg-[#514ff1] text-white p-3 text-lg mb-3 mt-6">
            Get started
          </motion.button>
        </div>

        <img
          className="max-lg:order-1"
          src={heroImage}
        />
      </section>
    </main>
  );
};
