import { createContext, useContext } from "react";
import { useState } from "react";

const stateContext = createContext();
export const useList = () => useContext(stateContext);

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signUpUser, setSignUpUser] = useState(null);

  return (
    <stateContext.Provider
      value={{
        user,
        setUser,
        signUpUser,
        setSignUpUser
      }}>
      {children}
    </stateContext.Provider>
  );
};
