import z from "zod";
export const LoginBody = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(40),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export const RegisterBody = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }).max(40),
    lastName: z.string().min(1, { message: "Last Name is required" }).max(40),
    email: z.string().email(),
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
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
