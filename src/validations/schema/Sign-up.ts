import { User } from "@/src/interfaces";
import * as yup from "yup";

export const SignUpValidationSchema = yup
  .object()
  .shape<Record<keyof User, yup.AnySchema>>({
    firstName: yup.string().required("Nome é necessário"),
    lastName: yup.string().required("Sobrenome é necessário"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("É necessário um endereço de e-mail"),
    password: yup
      .string()
      .min(8, ({ min }) => `A senha deve ser pelo menos ${min} letras`)
      .required("Senha requerida"),
  });
