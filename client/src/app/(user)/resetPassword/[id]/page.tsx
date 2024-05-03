"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import userApiRequest from "@/apiRequest/user";
const resetPasswordBody = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" })
      .max(40),
    passwordConfirm: z
      .string()
      .min(8, {
        message: "Password confirm must contain at least 8 character(s)",
      })
      .max(40),
  })
  .strict()
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["passwordConfirm"],
      });
    }
  });
export default function ResetToken({ params }: { params: { id: string } }) {
  const form = useForm<z.TypeOf<typeof resetPasswordBody>>({
    resolver: zodResolver(resetPasswordBody),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  async function onSubmit(values: z.TypeOf<typeof resetPasswordBody>) {
    try {
      const response = await userApiRequest.resetPassword({
        token: params.id,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      });
      if (response.status === "success") {
        window.location.href = "/";
      }
    } catch (error) {}
  }
  return (
    <div>
      <div className="px-24 fixed top-0 left-0 pt-2 right-0 border-b-[1px] pb-2">
        <div className="flex items-center justify-between ">
          <div className="flex  justify-center items-center">
            <Image
              alt="logo"
              src={"/logo.png"}
              priority={true}
              width={80}
              height="0"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="flex select-none ml-[-10px]">
              <p className="text-[#31AE84] text-2xl font-bold">Sun</p>
              <p className="text-[#14B0C4] text-2xl font-bold">Travel</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 w-full">
        <div className="w-[30%] h-fit mx-auto ">
          <p className="text-3xl mb-4 font-bold">Reset password</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        form.formState.errors.password
                          ? "text-red-500"
                          : "text-gray-600"
                      } text-[15px] `}
                    >
                      New password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={`${
                          form.formState.errors.password
                            ? "bg-red-100 focus-visible:ring-red-400 border-[1px] border-red-400"
                            : "focus-visible:ring-primary-color"
                        } focus-visible:ring-[1px]  px-4 text-[15px] py-5 autofill:bg-white focus-visible:ring-offset-0`}
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        form.formState.errors.passwordConfirm
                          ? "text-red-500"
                          : "text-gray-600"
                      } text-[15px] `}
                    >
                      New password confirm
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={`${
                          form.formState.errors.passwordConfirm
                            ? "bg-red-100 focus-visible:ring-red-400 border-[1px] border-red-400"
                            : "focus-visible:ring-primary-color"
                        } focus-visible:ring-[1px]  px-4 text-[15px] py-5 autofill:bg-white focus-visible:ring-offset-0`}
                        placeholder="New password confirm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm font-semibold" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className=" w-full text-[16px] bg-primary-color font-bold hover:bg-primary-color"
              >
                Reset my password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
