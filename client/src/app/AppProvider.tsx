"use client";
import http, { sessionToken } from "@/lib/http";
import { createContext, useContext, useEffect, useState } from "react";
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
  useEffect(() => {
    // Get URL parameter
    const params = new URLSearchParams(window.location.search);
    const showLoginModalParam = params.get("showLoginModal");

    // Set showLoginModal state based on URL parameter
    if (showLoginModalParam === "1") {
      setShowLoginModal(true);
    }
  }, []);
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
