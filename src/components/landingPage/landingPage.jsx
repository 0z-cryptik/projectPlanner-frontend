import heroImage from "./images/3682888.jpg";
import { useNavigate } from "react-router";

export const LandingPage = () => {
  return (
    <main className="h-[100svh]">
      <nav className="w-full flex flex-row p-3 fixed">
        <p className="flex-grow text-2xl">Logo</p>
        <button className="mr-3">Login</button>
        <button className="border rounded-xl bg-blue-700 text-white p-3">
          Get started
        </button>
      </nav>

      <div className="h-full flex flex-col items-center justify-center">
        <section className="flex flex-row">
          <div className="w-1/2 text-center flex flex-col items-center justify-center">
            <h1 className="text-6xl w-[70%] font-bold">
              Organize your work and projects today
            </h1>
            <p className="w-[70%] text-lg mt-5">
              Break down your projects into tasks, group your tasks into different sections
            </p>
          </div>

          <img
            className="w-1/2"
            src={heroImage}
          />
        </section>

        <center className="mt-7">
          <button className="border rounded-xl bg-blue-700 text-white p-3 text-lg">
            Get started
          </button>
        </center>
      </div>
    </main>
  );
};
