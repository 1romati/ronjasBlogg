import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setUser({
        email: currentUser.email,
        id: currentUser.uid,
        username: currentUser.email.split("@")[0],
      });
    } else {
      setUser(null);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
