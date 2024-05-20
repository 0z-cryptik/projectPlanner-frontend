import heroImage from "./images/3682888.jpg";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export const LandingPage = () => {
  return (
    <main className="flex flex-col">
      <nav className="w-full flex flex-row p-3">
        <p className="flex-grow text-2xl">Logo</p>
        <button className="mr-3 hover:bg-gray-200 px-3 max-md:text-xs rounded-xl">
          Login
        </button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="border rounded-xl bg-[#514ff1] text-white p-3 max-md:text-xs">
          Get started
        </motion.button>
      </nav>

      <section className="flex flex-col lg:flex-row mt-[5rem] lg:mt-[6.5rem]">
        <div className="lg:w-1/2 text-center flex flex-col items-center max-md:order-2 justify-center">
          <h1 className="text-4xl md:text-6xl md:w-[70%] font-bold max-md:mt-[4rem] px-3">
            Organize your work and projects today
          </h1>
          <p className="w-[70%] text-lg mt-5">
            Break down your projects into tasks, group your tasks into
            different sections
          </p>
        </div>

        <img
          className="lg:w-1/2 max-lg:order-1"
          src={heroImage}
        />
      </section>

      <center className="mt-[5rem]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="border rounded-xl bg-[#514ff1] text-white p-3 text-lg mb-3">
          Get started
        </motion.button>
      </center>
    </main>
  );
};
