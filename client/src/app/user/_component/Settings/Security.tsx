"use client";
import userApiRequest from "@/apiRequest/user";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Security() {
  const { toast } = useToast();
  const [error, setError] = useState<string[]>([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewOldPassword, setViewOldPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const handleUpdatePassword = async () => {
    if (oldPassword.trim() === "") {
      setError((prev) => {
        return [...prev, "old password"];
      });
    }
    if (confirmPassword !== newPassword) {
      setError((prev) => {
        return [...prev, "confirm password"];
      });
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 40) {
      setError((prev) => {
        return [...prev, "new password"];
      });
      return;
    }
    try {
      const response = await userApiRequest.updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (
        response.status === "failed" &&
        response.message === "Old password is not correct"
      ) {
        setError((prev) => [...prev, "old password"]);
      }
      if (response.status === "success") {
        setError([]);
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        toast({
          title: "",
          status: "success",
          description: "Updated password successfully !",
        });
      }
    } catch (error) {}
  };
  return (
    <div className="py-4 border-[1px] rounded-md border-gray-300 mt-4">
      <header className="px-6 font-bold pb-4 border-gray-300 border-b-[1px]">
        Change password
      </header>
      <div className="px-6">
        <p
          className={`${
            error.includes("old password") ? "text-red-500" : "text-gray-700"
          } mt-6 text-sm font-bold `}
        >
          Old password
        </p>
        <div className="relative w-[70%]">
          <input
            value={oldPassword}
            onChange={(e) => {
              setError([]);
              setOldPassword(e.target.value);
            }}
            type={`${viewOldPassword ? "text" : "password"}`}
            className={`${
              error.includes("old password")
                ? "bg-red-50 border-red-400 focus:ring-red-500"
                : "focus:ring-primary-color  border-gray-300"
            } transition-all  focus:ring-[1px] text-sm font-semibold text-gray-700 px-4 w-full py-3 outline-none border-[1px] rounded-md mt-1`}
          ></input>
          <div
            onClick={() => setViewOldPassword((prev) => !prev)}
            className="absolute right-[3%] cursor-pointer  top-[50%] translate-y-[-40%]"
          >
            {!viewOldPassword && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-primary-color"
              />
            )}
            {viewOldPassword && (
              <FontAwesomeIcon icon={faEye} className="text-primary-color" />
            )}
          </div>
        </div>
        {error.includes("old password") && (
          <p className="text-xs mt-1 text-red-500 font-bold">
            Old password is not correct.
          </p>
        )}
        <p className="mt-2 text-sm font-bold text-gray-700">New password</p>
        <div className="relative w-[70%]">
          <input
            value={newPassword}
            onChange={(e) => {
              setError([]);
              setNewPassword(e.target.value);
            }}
            type={`${viewNewPassword ? "text" : "password"}`}
            className={`${
              error.includes("new password")
                ? "bg-red-50 border-red-400 focus:ring-red-500"
                : "focus:ring-primary-color  border-gray-300"
            } transition-all  focus:ring-[1px] text-sm font-semibold text-gray-700 px-4 w-full py-3 outline-none border-[1px] rounded-md mt-1`}
          ></input>
          <div
            onClick={() => setViewNewPassword((prev) => !prev)}
            className="absolute right-[3%] cursor-pointer  top-[50%] translate-y-[-40%]"
          >
            {!viewNewPassword && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-primary-color"
              />
            )}
            {viewNewPassword && (
              <FontAwesomeIcon icon={faEye} className="text-primary-color" />
            )}
          </div>
        </div>
        {error.includes("new password") && (
          <p className="text-xs mt-1 text-red-500 font-bold">
            Password must be from 8 - 40 character(s).
          </p>
        )}
        <p
          className={`${
            error.includes("confirm password")
              ? "text-red-500"
              : "text-gray-700"
          } mt-6 text-sm font-bold `}
        >
          Confirm password
        </p>
        <div className="relative w-[70%]">
          <input
            value={confirmPassword}
            onChange={(e) => {
              setError([]);
              setConfirmPassword(e.target.value);
            }}
            type={`${viewConfirmPassword ? "text" : "password"}`}
            className={`${
              error.includes("confirm password")
                ? "bg-red-50 border-red-400 focus:ring-red-500"
                : "focus:ring-primary-color  border-gray-300"
            } transition-all  focus:ring-[1px] text-sm font-semibold text-gray-700 px-4 w-full py-3 outline-none border-[1px] rounded-md mt-1`}
          ></input>
          <div
            onClick={() => setViewConfirmPassword((prev) => !prev)}
            className="absolute right-[3%] cursor-pointer  top-[50%] translate-y-[-40%]"
          >
            {!viewConfirmPassword && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-primary-color"
              />
            )}
            {viewConfirmPassword && (
              <FontAwesomeIcon icon={faEye} className="text-primary-color" />
            )}
          </div>
        </div>
        {error.includes("confirm password") && (
          <p className="text-xs mt-1 text-red-500 font-bold">
            Confirm password is not correct.
          </p>
        )}
        <div className="flex gap-4 mt-4 items-center">
          <Button
            onClick={() => {
              setError([]);
              setConfirmPassword("");
              setNewPassword("");
              setOldPassword("");
            }}
            className="bg-white font-bold text-primary-color border-[1px] border-primary-color hover:bg-gray-100 hover:opacity-90 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdatePassword();
            }}
            className="bg-primary-color font-bold text-white hover:bg-blue-600 transition-all"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
