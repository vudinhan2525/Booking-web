import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import {
  LoginBody,
  LoginBodyType,
} from "@/utils/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleIcons } from "@/lib/icon";
import http from "@/lib/http";

export default function LoginModal() {
  const { setShowLoginModal } = useAppContext();
  const handleTurnOffModal = (e: any) => {
    if (e.target.classList.contains("modal")) {
      setShowLoginModal(false);
    }
  };
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const response = await http.post<any>("/auth/login", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (
        response.statusCode === 400 &&
        response.message === "Email or password is not correct"
      ) {
        form.setError("email", { message: "" });
        form.setError("password", { message: response.message });
      }
      if (response.status === "success") {
        window.location.reload();
      }
    } catch (error) {}
  }
  return (
    <div
      onMouseDown={(e) => handleTurnOffModal(e)}
      className="modal fixed top-0 animate-fadeIn right-0 left-0 bottom-0 bg-black/10"
    >
      <div className="absolute bg-white px-6 pt-8 pb-6 w-[35%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-3xl font-bold">Login</p>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setShowLoginModal(false)}
            className="text-3xl cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
          ></FontAwesomeIcon>
        </div>
        <div className="max-h-[80vh] overflow-y-auto px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        form.formState.errors.email
                          ? "text-red-500"
                          : "text-gray-600"
                      } text-[15px] `}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${
                          form.formState.errors.email
                            ? "bg-red-100 focus-visible:ring-red-400 border-[1px] border-red-400"
                            : "focus-visible:ring-primary-color"
                        } focus-visible:ring-[1px]  px-4 text-[15px] py-5 autofill:bg-white focus-visible:ring-offset-0`}
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
                    <FormLabel
                      className={`${
                        form.formState.errors.password
                          ? "text-red-500"
                          : "text-gray-600"
                      } text-[15px] `}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={`${
                          form.formState.errors.password
                            ? "bg-red-100 focus-visible:ring-red-400 border-[1px] border-red-400"
                            : "focus-visible:ring-primary-color"
                        } focus-visible:ring-[1px]  px-4 text-[15px] py-5 autofill:bg-white focus-visible:ring-offset-0`}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm font-semibold" />
                  </FormItem>
                )}
              />
              <div className="text-sm  cursor-pointer underline inline-block">
                Forgot password?
              </div>
              <Button
                type="submit"
                className=" w-full text-[16px] bg-primary-color font-bold hover:bg-primary-color"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex items-center mt-2">
          <div className=" h-[1px] w-full bg-gray-300"></div>
          <p className="min-w-[50%] text-center text-gray-700">
            or log in/register with
          </p>
          <div className=" h-[1px] w-full bg-gray-300"></div>
        </div>
        <div className="my-4">
          <div className="flex items-center gap-1 border-[1px] w-fit mx-auto px-8 py-[6px] border-primary-color rounded-lg cursor-pointer">
            <GoogleIcons width="30px" height="30px"></GoogleIcons>
            <p className="text-primary-color font-bold">Continue with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}
