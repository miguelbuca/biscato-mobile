import { Work } from "@/src/interfaces";
import * as yup from "yup";

export const WorkValidationSchema = yup
  .object()
  .shape<Record<keyof Work, yup.AnySchema>>({
    costPerHour: yup.number().required("Nome é necessário"),
    description: yup.string().required("Nome é necessário"),
    totalTime: yup.number().required("Nome é necessário"),
    time: yup.string().required("Nome é necessário"),
    term: yup.string().required("Nome é necessário"),
    address: yup.object().required("Nome é necessário"),
    skillTypeId: yup.number().required("Nome é necessário"),
  });
