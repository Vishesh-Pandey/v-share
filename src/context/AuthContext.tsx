import { User } from "firebase/auth";
import React, { createContext, useState } from "react";

type AuthContextProps = {
  children: React.ReactNode;
};

interface AuthUserProvider {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

type AuthProvider = AuthUserProvider;

export const AuthContext = createContext<AuthProvider>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
