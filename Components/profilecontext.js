import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword]=useState("")
  const [contact, setContact] = useState("");
  return (
    <ProfileContext.Provider
      value={{ name, setName, email, setEmail,Password, setPassword, contact, setContact }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
