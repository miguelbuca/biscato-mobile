import { Person } from "@/src/interfaces/Person";
import * as yup from "yup";

export const PersonValidationSchema = yup
  .object()
  .shape<Record<keyof Pick<Person, "nif" | "birthday"| 'phoneNumber'>, yup.AnySchema>>({
    nif: yup.string().min(12).required(),
    birthday: yup.date().required().max(new Date()),
    phoneNumber: yup.string().required()
  });
