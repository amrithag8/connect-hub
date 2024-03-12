import React, { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [activeUser, setActiveUser] = useState();
  const [profileUser, setProfileUser] = useState();

  return (
    <UserContext.Provider
      value={{
        suggestions,
        setSuggestions,
        activeUser,
        setActiveUser,
        profileUser,
        setProfileUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
