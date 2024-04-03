import { createContext, useContext } from "react";
import { useState } from "react";

const stateContext = createContext();
export const useList = () => useContext(stateContext);

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signUpUser, setSignUpUser] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <stateContext.Provider
      value={{
        user,
        setUser,
        signUpUser,
        setSignUpUser,
        password,
        setPassword,
        email,
        setEmail
      }}>
      {children}
    </stateContext.Provider>
  );
};
