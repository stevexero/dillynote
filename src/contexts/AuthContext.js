import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  //   SIGNUP
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  //   LOGIN
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  //   LOGOUT
  const logout = () => {
    return auth.signOut();
  };

  //   RESET PASSWORD
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  //   UPDATE EMAIL
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  //   UPDATE PASSWORD
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  //   USER STATE OBSERVER
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};