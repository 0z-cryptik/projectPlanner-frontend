import { createContext, useContext } from "react";
import { useState } from "react";

const stateContext = createContext();
export const useList = () => useContext(stateContext);

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signUpUser, setSignUpUser] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState([]);
  const [creatingNewProject, setCreatingNewProject] = useState(false);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [error, setError] = useState("");
  const [fixPage, setFixPage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const fetchFunc = async (url, data2submit) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data2submit),
      headers: { "Content-Type": "application/json" }
    });

    const response = await res.json();
    console.log(response);
    setProjects(response.user.projects.reverse());

    if (response.success) {
      return { success: true };
    }
  };

  const stateObj = {
    user,
    setUser,
    signUpUser,
    setSignUpUser,
    password,
    setPassword,
    email,
    setEmail,
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
    fixPage,
    setFixPage,
    showMenu,
    setShowMenu
  };

  return (
    <stateContext.Provider value={stateObj}>
      {children}
    </stateContext.Provider>
  );
};
