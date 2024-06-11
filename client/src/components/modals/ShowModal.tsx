"use client";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAdminContext } from "@/app/(adminApp)/admin/AdminProvider";

export default function ShowModal() {
  const { showLoginModal, showRegisterModal } = useAppContext();
  const { showLoginAdminModal, showRegisterAdminModal } = useAdminContext();
  return (
    <div>
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      {showLoginAdminModal && <LoginModal fromAdminPage={true} />}
      {showRegisterAdminModal && <RegisterModal fromAdminPage={true} />}
    </div>
  );
}
