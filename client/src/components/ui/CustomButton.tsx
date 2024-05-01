"use client";
import { useAppContext } from "@/app/AppProvider";
import { Button } from "./button";

export default function CustomButton({
  variant,
  className,
  children,
  showLoginModal,
  showRegisterModal,
}: {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className: string;
  children: React.ReactNode | undefined;
  showLoginModal?: boolean;
  showRegisterModal?: boolean;
}) {
  const { setShowLoginModal, setShowRegisterModal } = useAppContext();
  return (
    <Button
      onClick={() => {
        if (showLoginModal) {
          setShowLoginModal(true);
        }
        if (showRegisterModal) {
          setShowRegisterModal(true);
        }
      }}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
