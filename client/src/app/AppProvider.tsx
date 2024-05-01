"use client";
import { createContext, useContext, useState } from "react";
const AppContext = createContext<{
  showLoginModal: boolean;
  setShowLoginModal: (t: boolean) => void;
}>({
  showLoginModal: false,
  setShowLoginModal: () => {},
});
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <AppContext.Provider value={{ showLoginModal, setShowLoginModal }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
