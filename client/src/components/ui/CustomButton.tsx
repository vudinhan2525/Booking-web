"use client";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { Button } from "./button";
import authApiRequest from "@/apiRequest/auth";
import { useAdminContext } from "@/app/(adminApp)/admin/AdminProvider";

export default function CustomButton({
  variant,
  className,
  children,
  showLoginModal,
  showRegisterModal,
  buttonLogout,
}: {
  variant:
    | "default"
    | "destructive"
    | "transparent"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className: string;
  children: React.ReactNode | undefined;
  showLoginModal?: boolean;
  showRegisterModal?: boolean;
  buttonLogout?: boolean;
}) {
  const { setShowLoginModal, setShowRegisterModal } = useAppContext();
  const { setShowRegisterAdminModal, setShowLoginAdminModal } =
    useAdminContext();
  return (
    <Button
      onClick={async () => {
        if (showLoginModal) {
          if (setShowLoginModal) {
            setShowLoginModal(true);
          }
          if (setShowLoginAdminModal) {
            setShowLoginAdminModal(true);
          }
        }
        if (showRegisterModal) {
          if (setShowRegisterModal) {
            setShowRegisterModal(true);
          }
          if (setShowRegisterAdminModal) {
            setShowRegisterAdminModal(true);
          }
        }

        if (buttonLogout) {
          const response = await authApiRequest.logoutFromNextClient();
          if (response.status === "success") {
            window.location.reload();
          }
        }
      }}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
