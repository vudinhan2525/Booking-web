"use client";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import { Button } from "./button";
import authApiRequest from "@/apiRequest/auth";

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
  return (
    <Button
      onClick={async () => {
        if (showLoginModal) {
          setShowLoginModal(true);
        }
        if (showRegisterModal) {
          setShowRegisterModal(true);
        }
        if (buttonLogout) {
          const response = await authApiRequest.logoutFromNextClient();
          if (response.status === "success") {
            window.location.href = "/";
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
