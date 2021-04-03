import React, { useState, useContext, useEffect } from "react";
import { FIREBASE_AUTH } from "../utils/auth-utils";
import firebase from "firebase";

type FireBaseUser = firebase.User;
type FireBaseUserCredentials = firebase.auth.UserCredential;

interface IAuthContext {
  currentUser?: FireBaseUser;
  signUp: (email: string, password: string) => Promise<FireBaseUserCredentials>;
  login: (email: string, password: string) => Promise<FireBaseUserCredentials>;
  logout: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
}

const AuthContext = React.createContext<IAuthContext>({
  currentUser: undefined,
  signUp: () =>
    Promise.resolve({
      additionalUserInfo: undefined,
      credential: null,
      opeartionType: undefined,
      user: null,
    }),
  login: () =>
    Promise.resolve({
      additionalUserInfo: undefined,
      credential: null,
      opeartionType: undefined,
      user: null,
    }),
  logout: () => Promise.resolve(),
  passwordReset: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  updateEmail: () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FireBaseUser | undefined>();
  const [loading, setLoading] = useState(true);

  const signUp = (email: string, password: string) => {
    return FIREBASE_AUTH.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return FIREBASE_AUTH.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return FIREBASE_AUTH.signOut();
  };

  const passwordReset = (email: string) => {
    return FIREBASE_AUTH.sendPasswordResetEmail(email);
  };

  const updatePassword = (password: string) => {
    return currentUser?.updatePassword(password) || Promise.reject();
  };

  const updateEmail = (email: string) => {
    return currentUser?.updateEmail(email) || Promise.reject();
  };

  useEffect(() => {
    const unsubscriber = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setCurrentUser(user || undefined);
      setLoading(false);
    });
    return unsubscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        login,
        logout,
        passwordReset,
        updatePassword,
        updateEmail,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
