import { zodResolver } from "@hookform/resolvers/zod";
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
export const forgotBody = z.object({
  email: z.string().email(),
});
export default function ForgotModal() {
  // 1. Define your form.
  const form = useForm<z.TypeOf<typeof forgotBody>>({
    resolver: zodResolver(forgotBody),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.TypeOf<typeof forgotBody>) {
    try {
      const response = await userApiRequest.forgotPassword(values);
      console.log(response);
    } catch (error) {}
  }
  return (
    <div>
      {" "}
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
          <Button
            type="submit"
            className=" w-full text-[16px] bg-primary-color font-bold hover:bg-primary-color"
          >
            Send me an email
          </Button>
        </form>
      </Form>
    </div>
  );
}
