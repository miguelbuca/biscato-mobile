import { Work } from "@/src/interfaces";
import * as yup from "yup";

export const WorkValidationSchema = yup
  .object()
  .shape<Record<keyof Work, yup.AnySchema>>({
    title: yup.string().required("Título é necessário"),
    costPerHour: yup.string().required("Custo por hora é necessário"),
    description: yup.string(),
    totalTime: yup.number().required("Tempo total é necessário"),
    time: yup.string().required("Duração é necessário"),
    term: yup.string(),
    address: yup.object(),
    skillTypeId: yup.number().required("Habilidade é necessário"),
  });
