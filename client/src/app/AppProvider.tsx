"use client";
import { sessionToken } from "@/lib/http";
import { createContext, useContext, useState } from "react";
const AppContext = createContext<{
  showLoginModal: boolean;
  setShowLoginModal: (t: boolean) => void;
  showRegisterModal: boolean;
  setShowRegisterModal: (t: boolean) => void;
}>({
  showLoginModal: false,
  setShowLoginModal: () => {},
  showRegisterModal: false,
  setShowRegisterModal: () => {},
});
export function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  useState(() => {
    if (typeof window !== undefined) {
      sessionToken.value = initialSessionToken;
    }
  });
  return (
    <AppContext.Provider
      value={{
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
