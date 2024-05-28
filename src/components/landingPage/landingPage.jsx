import heroImage from "./images/3682888.jpg";
import logo from "./images/logo/task-list-2.png";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useList } from "@/src/hooks/stateProvider";
import { Img } from "react-image";
import { Skeleton } from "@/components/ui/skeleton";
import { ThreeDots } from "react-loader-spinner";

export const LandingPage = () => {
  const [checkingLoginState, setCheckLoginState] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);
  const { setUser, setProjects } = useList();
  const navigate = useNavigate();

  useEffect(() => {
    loginStateCheck();
  }, []);

  const loginStateCheck = async () => {
    setCheckLoginState(true);
    try {
      const res = await fetch("/api/user/check");
      const response = await res.json();
      console.log(response);
      if (response.success) {
        setUser(response.user);
        setProjects(response.user.projects.reverse());
        navigate("/workspace");
      } else {
        setShowLandingPage(true);
      }
    } catch (err) {
      setShowLandingPage(true);
    } finally {
      setCheckLoginState(false);
    }
  };

  const animation = {
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    initial: {
      opacity: 0,
      y: -10
    }
  };

  const childrenAnimation = {
    animate: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: -10 }
  };

  if (checkingLoginState) {
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <p className="text-2xl">LOADING</p>
      </main>
    );
  }

  if (showLandingPage) {
    return (
      <motion.main
        initial="initial"
        animate="animate"
        variants={animation}
        className="flex flex-col h-screen overflow-hidden">
        <nav className="w-full flex flex-row p-3 lg:order-1">
          <motion.p
            variants={childrenAnimation}
            className="flex-grow">
            <Img
              className="w-[3.5rem] ml-5"
              src={logo}
              loader={<Skeleton className="w-[3.5rem] ml-5" />}
            />
          </motion.p>
          <motion.button
            variants={childrenAnimation}
            onClick={() => {
              navigate("/login");
            }}
            className="mr-3 hover:bg-gray-200 px-3 max-md:text-xs md:font-bold rounded-xl">
            Login
          </motion.button>
          <motion.button
            variants={childrenAnimation}
            onClick={() => {
              navigate("/signup");
            }}
            whileHover={{ scale: 1.1 }}
            className="border rounded-xl bg-gradient-to-b hover:bg-gradient-to-t from-[#0cb2ff] to-[#4e61ff] text-white p-3 max-md:text-xs">
            Get started
          </motion.button>
        </nav>

        <section className="flex flex-col flex-grow mt-[5rem] md:mt-[3rem] lg:order-3">
          <div className="text-center flex flex-col items-center max-md:order-2 justify-center">
            <motion.h1
              variants={childrenAnimation}
              className="text-4xl md:text-6xl md:w-[70%] font-bold mt-[4rem] lg:mt-[1rem] max-md:px-3">
              Organize your work and projects today
            </motion.h1>
            <motion.p
              variants={childrenAnimation}
              className="w-[70%] text-lg mt-5">
              Break down your projects into tasks, group your tasks into
              different sections
            </motion.p>

            <motion.button
              variants={childrenAnimation}
              onClick={() => {
                navigate("/signup");
              }}
              whileHover={{ scale: 1.1 }}
              className="border rounded-xl bg-[#514ff1] text-white p-3 text-lg mb-3 mt-6">
              Get started
            </motion.button>
          </div>
          <Img
            className="max-lg:order-1"
            src={heroImage}
            loader={
              <div className="max-lg:order-1 w-full h-full flex justify-center items-center">
                <ThreeDots color="gray" />
              </div>
            }
          />
        </section>
      </motion.main>
    );
  }
};
