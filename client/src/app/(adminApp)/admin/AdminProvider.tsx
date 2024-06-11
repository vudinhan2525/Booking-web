"use client";
import userApiRequest from "@/apiRequest/user";
import { IUser } from "@/interfaces/IUser";
import { createContext, useContext, useEffect, useState } from "react";
const AdminContext = createContext<{
  showLoginAdminModal: boolean;
  setShowLoginAdminModal: (t: boolean) => void;
  showRegisterAdminModal: boolean;
  setShowRegisterAdminModal: (t: boolean) => void;
  admin: IUser | null;
  setAdmin: (user: IUser | null) => void;
  isAdminAuthenticated: boolean;
}>({
  showLoginAdminModal: false,
  setShowLoginAdminModal: () => {},
  showRegisterAdminModal: false,
  setShowRegisterAdminModal: () => {},
  admin: null,
  setAdmin: () => {},
  isAdminAuthenticated: false,
});
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [showLoginAdminModal, setShowLoginAdminModal] = useState(false);
  const [showRegisterAdminModal, setShowRegisterAdminModal] = useState(false);
  const [admin, setAdmin] = useState<IUser | null>(null);
  const isAdminAuthenticated = Boolean(admin);
  useEffect(() => {
    getUserAuth();
  }, []);
  const getUserAuth = async () => {
    try {
      const response = await userApiRequest.getMeFromClient();
      if (response.status === "success" && response.data.role === "admin") {
        setAdmin(response.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdminAuthenticated,
        setAdmin,
        showLoginAdminModal,
        setShowLoginAdminModal,
        showRegisterAdminModal,
        setShowRegisterAdminModal,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
export function useAdminContext() {
  return useContext(AdminContext);
}
