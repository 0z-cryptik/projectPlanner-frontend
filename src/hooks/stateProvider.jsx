import { createContext, useContext } from "react";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const stateContext = createContext();
export const useList = () => useContext(stateContext);

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [creatingNewProject, setCreatingNewProject] = useState(false);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [processingUser, setProcessingUser] = useState(false);
  const server = import.meta.env.VITE_SERVER_URL;

  const fetchFunc = async (url, data2submit) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data2submit),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    const response = await res.json();
    setProjects(response.user.projects.reverse());

    if (response.success) {
      return { success: true };
    }
  };

  const stateObj = {
    user,
    setUser,
    projects,
    setProjects,
    creatingNewProject,
    setCreatingNewProject,
    activeProject,
    setActiveProject,
    createNewTask,
    setCreateNewTask,
    fetchFunc,
    error,
    setError,
    showMenu,
    setShowMenu,
    showPhoneForm,
    setShowPhoneForm,
    darkMode,
    setDarkMode,
    processingUser,
    setProcessingUser,
    server
  };

  return (
    <stateContext.Provider value={stateObj}>
      {children}
    </stateContext.Provider>
  );
};
