"use client";
import userApiRequest from "@/apiRequest/user";
import { IUser } from "@/interfaces/IUser";
import { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext<{
  showLoginModal: boolean;
  setShowLoginModal: (t: boolean) => void;
  showRegisterModal: boolean;
  setShowRegisterModal: (t: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isAuthenticated: boolean;
}>({
  showLoginModal: false,
  setShowLoginModal: () => {},
  showRegisterModal: false,
  setShowRegisterModal: () => {},
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = Boolean(user);
  useEffect(() => {
    // Get URL parameter
    const params = new URLSearchParams(window.location.search);
    const showLoginModalParam = params.get("showLoginModal");
    // Set showLoginModal state based on URL parameter
    if (showLoginModalParam === "1") {
      setShowLoginModal(true);
    }
    getUserAuth();
  }, []);
  const getUserAuth = async () => {
    try {
      const response = await userApiRequest.getMeFromClient();
      if (response.status === "success") {
        setUser(response.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        showLoginModal,
        setShowLoginModal,
        showRegisterModal,
        setShowRegisterModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
