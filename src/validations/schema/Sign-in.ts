import { User } from "@/src/interfaces";
import * as yup from "yup";

export const SignInValidationSchema = yup
  .object()
  .shape<Record<keyof Pick<User, "email" | "password">, yup.AnySchema>>({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("É necessário um endereço de e-mail"),
    password: yup
      .string()
      .min(8, ({ min }) => `A senha deve ser pelo menos ${min} letras`)
      .required("Senha requerida"),
  });
