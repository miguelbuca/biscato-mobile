import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Person, Portfolio, User } from "@/src/interfaces";
import { AuthSelectors, setCurrentUser } from "@/src/reduxStore/slices/auth";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useColorScheme } from "nativewind";
import { useCallback, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";

export const useAccountController = () => {
  const user: User = useSelector(AuthSelectors).user;
  const selectedPersonIndex: number =
    useSelector(AuthSelectors).selectedPersonIndex;
  const person = user.persons?.[selectedPersonIndex];
  const dispatch = useDispatch();

  const editInput = useBetterState<string>("");

  const { colorScheme } = useColorScheme();

  const selectedInput = useBetterState<{
    inputType?: "phone" | "date" | "text" | "textarea";
    label?: string;
    value?: string;
    type?: "User" | "Person" | "Portfolio" | "none";
    fieldName?: keyof User | keyof Person | keyof Portfolio;
    disabled?: boolean;
  }>({});

  const modalizeRef = useRef<Modalize>(null);

  const items: (typeof selectedInput.value)[] = [
    {
      label: "Dados Pessoais",
      type: "none",
    },
    {
      label: "Nome",
      value: `${user.firstName}`,
      type: "User",
      fieldName: "firstName",
    },
    {
      label: "Sobrenome",
      value: `${user.lastName}`,
      type: "User",
      fieldName: "lastName",
    },
    {
      label: "E-mail",
      value: `${user.email}`,
      type: "User",
      disabled: true,
      fieldName: "email",
    },
    {
      label: "NIF",
      value: `${person?.nif}`,
      type: "Person",
      disabled: true,
      fieldName: "nif",
    },
    {
      label: "Telemóvel",
      value: `${person?.phoneNumber}`,
      type: "Person",
      inputType: "phone",
      fieldName: "phoneNumber",
    },
    {
      label: "Aniversário",
      value: `${
        person?.birthday ? new Date(person?.birthday).toDateString() : "-"
      }`,
      type: "Person",
      inputType: "date",
      fieldName: "birthday",
    },
    {
      label: "Portfólio",
      type: "none",
    },
    {
      label: "Título",
      value: person?.portfolio?.title,
      type: "Portfolio",
      fieldName: "title",
    },
    {
      label: "Biografia",
      value: person?.portfolio?.biography,
      type: "Portfolio",
      inputType: "textarea",
      fieldName: "biography",
    },
  ];

  const handlerSelectInput = (item: typeof selectedInput.value) => {
    if (!item.value || item.disabled) return;
    switch (item.inputType) {
      case "date":
        editInput.value = new Date(item.value).toDateString();
        break;
      default:
        editInput.value = item.value;
        break;
    }
    selectedInput.value = item;
    modalizeRef.current?.open();
  };

  const handlerEditInput = (text: string | Date) => {
    editInput.value = text.toString();
  };

  const handlerSaveInputChange = useCallback(async () => {
    if (!selectedInput.value.fieldName) return;
    modalizeRef.current?.close();
    dispatch(isLoading(true));

    let payload: any = {};
    switch (selectedInput.value.type) {
      case "User":

      if(selectedInput.value.fieldName !== 'biography')

        payload[selectedInput.value.fieldName] = editInput.value;
        else
        payload[selectedInput.value.fieldName] = editInput.value;
        await Api.user.update(payload);
        break;
      case "Person":
        payload[selectedInput.value.fieldName] = editInput.value;
        await Api.persson.update(payload, person?.id);
        break;
      default:
        payload[selectedInput.value.fieldName] = editInput.value;
        await Api.portfolio.update(payload, person?.id);
        break;
    }

    Api.user
      .me()
      .then(({ data }) => {
        dispatch(setCurrentUser(data));
      })
      .finally(() => {
        dispatch(isLoading(false));
      });
  }, [selectedInput, editInput, person]);

  return {
    person,
    items,
    user,
    selectedPersonIndex,
    modalizeRef,
    handlerSelectInput,
    selectedInput,
    colorScheme,
    handlerEditInput,
    editInput,
    handlerSaveInputChange,
  };
};
