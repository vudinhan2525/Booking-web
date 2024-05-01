import { useAppContext } from "../AppProvider";

export default function LoginModal() {
  const { setShowLoginModal } = useAppContext();
  const handleTurnOffModal = (e: any) => {
    if (e.target.classList.contains("modal")) {
      setShowLoginModal(false);
    }
  };
  return (
    <div
      onMouseDown={(e) => handleTurnOffModal(e)}
      className="modal fixed top-0 animate-fadeIn right-0 left-0 bottom-0 bg-black/10"
    >
      <div className="absolute bg-white w-[500px] h-[500px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl"></div>
    </div>
  );
}
