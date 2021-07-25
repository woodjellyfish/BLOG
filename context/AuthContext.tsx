import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/clientApp";
import firebase from "firebase/app";

type AuthContextValue = {
  user: firebase.User | null | undefined;
  checkSignIn: boolean;
};

const AuthContext = createContext<AuthContextValue>(undefined);

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User | undefined>(undefined);
  const [checkSignIn, setCheckSignIn] = useState(false);
  const value = {
    user,
    checkSignIn,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      user && setUser(user);
      setCheckSignIn(true);
    });
    return () => {
      unsubscribed;
    };
  }, []);

  if (checkSignIn) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  } else {
    return <h1>loading...</h1>;
  }
};
