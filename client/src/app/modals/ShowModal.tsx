"use client";
import { useAppContext } from "../AppProvider";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function ShowModal() {
  const { showLoginModal, showRegisterModal } = useAppContext();
  return (
    <div>
      {showLoginModal && <LoginModal></LoginModal>}
      {showRegisterModal && <RegisterModal />}
    </div>
  );
}
