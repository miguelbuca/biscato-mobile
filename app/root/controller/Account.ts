import { useBetterState } from "@/src/hooks/useBetterState";
import { User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useSelector } from "react-redux";

export const useAccountController = () => {
  const user: User = useSelector(AuthSelectors).user;
  const selectedPersonIndex: number =
    useSelector(AuthSelectors).selectedPersonIndex;
  const person = user.persons?.[selectedPersonIndex];
  const firstName = useBetterState<string>("");
  const lastName = useBetterState<string>("");
  const email = useBetterState<string>("");
  const nif = useBetterState<string>("");
  const phoneNumber = useBetterState<string>("");
  const birthday = useBetterState<string>("");

  const items: {
    input: typeof firstName;
    label: string;
    value: string;
    type?: "User" | "Person" | "Portfolio";
  }[] = [
    {
      input: firstName,
      label: "Nome",
      value: `${user.firstName}`,
      type: "User",
    },
    {
      input: lastName,
      label: "Sobrenome",
      value: `${user.lastName}`,
      type: "User",
    },
    {
      input: email,
      label: "E-mail",
      value: `${user.email}`,
      type: "User",
    },
    {
      input: nif,
      label: "Nr. de Identificação Fiscal",
      value: `${person?.nif}`,
      type: "Person",
    },
    {
      input: phoneNumber,
      label: "Telemóvel",
      value: `${person?.phoneNumber}`,
      type: "Person",
    },
    {
      input: birthday,
      label: "Aniversário",
      value: `${
        person?.birthday
          ? new Date(person?.birthday).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "-"
      }`,
      type: "Person",
    },
  ];

  return {
    items,
    user,
    selectedPersonIndex,
  };
};
