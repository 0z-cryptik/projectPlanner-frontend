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
  const [completed, setCompleted] = useState(false);
  const server = import.meta.env.VITE_SERVER_URL;

  const fetchFunc = async (url, data2submit) => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const response = await res.json();

      if (response.success && response.user) {
        setProjects(
          response.user.projects ? [...response.user.projects].reverse() : []
        );
        return { success: true, response };
      }

      // If token expired or invalid, handle gracefully
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("userToken");
      }

      return { success: false, reason: response.reason || "Request failed" };
    } catch (err) {
      console.error("fetchFunc error:", err);
      return { success: false, reason: "Network error" };
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
    completed,
    setCompleted,
    server
  };

  return (
    <stateContext.Provider value={stateObj}>
      {children}
    </stateContext.Provider>
  );
};
