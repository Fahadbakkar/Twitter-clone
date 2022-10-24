import { createContext, useReducer, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((profileData) => {
        setCurrentUser(profileData);
        setStatus("idle");
      });
  }, []);
  //fetch profile

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        setCurrentUser,
        setStatus,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
export default CurrentUserProvider;
