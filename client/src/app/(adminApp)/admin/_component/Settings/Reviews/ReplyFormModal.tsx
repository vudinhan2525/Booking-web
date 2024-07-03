import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { Dispatch, SetStateAction } from "react";

export default function ReplyFormModal({
  setShowFormReply,
  replyTxt,
  setReplyTxt,
  handleReply,
}: {
  setShowFormReply: Dispatch<SetStateAction<boolean>>;
  replyTxt: string;
  setReplyTxt: Dispatch<SetStateAction<string>>;
  handleReply: () => Promise<void>;
}) {
  const handleTurnOffModal = (e: any) => {
    if (e.target.classList.contains("modal")) {
      if (setShowFormReply) {
        setShowFormReply(false);
      }
    }
  };
  return (
    <div
      onMouseDown={(e) => {
        handleTurnOffModal(e);
      }}
      className="modal z-[21] animate-fadeIn fixed top-0 right-0 left-0 bottom-0 bg-black/10"
    >
      <div className="absolute bg-white pt-4 pb-4 w-[35%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl">
        <header className="text-2xl pb-3 border-b-[1px] font-bold text-center">
          Reply review
        </header>
        <div className="px-6 mt-4">
          <p className="text-sm font-bold mb-2">Reply review from customer</p>
          <Textarea
            value={replyTxt}
            onChange={(e) => {
              setReplyTxt(e.target.value);
            }}
            placeholder="Write your reply here..."
            className="h-[200px]"
          />
        </div>
        <div className="flex px-6 mt-4 justify-end">
          <Button
            onClick={() => {
              handleReply();
            }}
            className="bg-primary-color font-bold hover:bg-blue-600"
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
