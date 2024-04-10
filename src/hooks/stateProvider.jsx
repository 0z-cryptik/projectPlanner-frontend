import { createContext, useContext } from "react";
import { useState } from "react";

const stateContext = createContext();
export const useList = () => useContext(stateContext);

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signUpUser, setSignUpUser] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [creatingNewTask, setCreatingNewtask] = useState(false);
  const [createNewSubTask, setCreateNewSubTask] = useState(false);
  const [activeTask, setActiveTask] = useState(0);
  const [subTaskToEdit, setSubTaskToEdit] = useState(null);
  const [editTask, setEditTask] = useState(false);

  const stateObj = {
    user,
    setUser,
    signUpUser,
    setSignUpUser,
    password,
    setPassword,
    email,
    setEmail,
    tasks,
    setTasks,
    creatingNewTask,
    setCreatingNewtask,
    activeTask,
    setActiveTask,
    createNewSubTask,
    setCreateNewSubTask,
    subTaskToEdit,
    setSubTaskToEdit,
    editTask,
    setEditTask
  };

  return (
    <stateContext.Provider value={stateObj}>
      {children}
    </stateContext.Provider>
  );
};
