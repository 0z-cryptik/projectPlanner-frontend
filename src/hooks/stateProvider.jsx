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
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editProject, setEditProject] = useState(false);

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
    taskToEdit,
    setTaskToEdit,
    editProject,
    setEditProject
  };

  return (
    <stateContext.Provider value={stateObj}>
      {children}
    </stateContext.Provider>
  );
};
