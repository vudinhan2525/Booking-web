"use client";
import { useAppContext } from "../AppProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleIcons } from "@/lib/icon";
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).max(40),
  lastName: z.string().min(1, { message: "Last Name is required" }).max(40),
  email: z.string().email(),
  password: z.string().min(8).max(40),
  passwordConfirm: z.string().min(8).max(40),
});
export default function RegisterModal() {
  const { setShowRegisterModal } = useAppContext();
  const handleTurnOffModal = (e: any) => {
    if (e.target.classList.contains("modal-register")) {
      setShowRegisterModal(false);
    }
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div
      onMouseDown={(e) => handleTurnOffModal(e)}
      className="modal-register animate-fadeIn fixed top-0 right-0 left-0 bottom-0 bg-black/10"
    >
      <div className="absolute bg-white px-6 pt-8 pb-6 w-[500px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-3xl font-bold">Register</p>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setShowRegisterModal(false)}
            className="text-3xl cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          ></FontAwesomeIcon>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px] text-gray-600">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-[1px] focus-visible:ring-primary-color px-4 text-[15px] py-5 focus-visible:ring-offset-0"
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px] text-gray-600">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-[1px] focus-visible:ring-primary-color px-4 text-[15px] py-5 focus-visible:ring-offset-0"
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm font-semibold" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px] text-gray-600">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-[1px] focus-visible:ring-primary-color px-4 text-[15px] py-5 focus-visible:ring-offset-0"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-semibold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px] text-gray-600">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="focus-visible:ring-[1px] focus-visible:ring-primary-color px-4 text-[15px] py-5 focus-visible:ring-offset-0"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-semibold" />
                </FormItem>
              )}
            />
            <div></div>
            <Button
              type="submit"
              className=" w-full text-[16px] bg-primary-color font-bold hover:bg-primary-color"
            >
              Register
            </Button>
          </form>
        </Form>
        <div className="flex items-center mt-2">
          <div className=" h-[1px] w-full bg-gray-300"></div>
          <p className="min-w-[50%] text-center text-gray-700">
            or log in/register with
          </p>
          <div className=" h-[1px] w-full bg-gray-300"></div>
        </div>
        <div className="my-2">
          <div className="flex items-center gap-1 border-[1px] w-fit mx-auto px-8 py-[6px] border-primary-color rounded-lg cursor-pointer">
            <GoogleIcons width="30px" height="30px"></GoogleIcons>
            <p className="text-primary-color font-bold">Continue with Google</p>
          </div>
        </div>
        <div className="text-center text-sm">
          By registering, you agree to our{" "}
          <p className="text-sm inline-block text-primary-color font-bold">
            Terms & Conditions
          </p>{" "}
          and that you have read our{" "}
          <p className="text-sm inline-block text-primary-color font-bold">
            Privacy Notice
          </p>
        </div>
      </div>
    </div>
  );
}
