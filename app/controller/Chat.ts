import { Api } from "@/src/api";
import { format } from "@/src/helper/format";
import { useBetterState } from "@/src/hooks/useBetterState";
import { useKeyboard } from "@/src/hooks/useKeyboard";
import { useSocket } from "@/src/hooks/useSocket";
import { Chat, User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useNavigation, useSearchParams } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

export const useChatController = () => {
  const { toAccount } = useSearchParams<{
    toAccount: string;
  }>();
  const { socket } = useSocket();
  const navigation = useNavigation();
  const { id: fromAccount }: User = useSelector(AuthSelectors).user;
  const otherAccount = useBetterState<User | undefined>(undefined);
  const message = useBetterState<string>("");
  const messages = useBetterState<Chat[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const scrollHeight = useBetterState<number>(0);
  const { keyboardHeight, displayFrame } = useKeyboard();
  var lastDate = "";

  const getDate = (value?: string) => {
    const formatedDate = format().date(value || "");

    if (formatedDate !== lastDate) {
      lastDate = formatedDate;
      return formatedDate; //format().checkDate(value || '');
    } else return null;
  };

  const load = useCallback(() => {
    if (!toAccount) return;

    Api.user.findUser(toAccount).then(({ data }) => {
      otherAccount.value = data;
    });
    socket &&
      Api.chat(socket)
        .messages(toAccount)
        .then(({ data }) => {
          messages.value = data;
        })
        .catch((error) => {
          console.log({ error });
        });
  }, [toAccount, scrollRef, socket]);

  useEffect(load, []);

  useEffect(() => {
    if (!socket) return;

    return Api.chat(socket).onMessage((payload: Chat) => {
      messages.value = [...messages.value, payload];
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    });
  }, [messages, scrollRef, socket, fromAccount]);

  const handlerMessage = useCallback(async () => {
    if (!socket) return;

    const { data } = await Api.chat(socket).sendMessage({
      content: message.value,
      toAccount: parseInt(`${toAccount}`),
    });

    if (data) {
      messages.value = [...messages.value, data];
      message.value = "";

      scrollRef.current?.scrollTo({
        x: 0,
        y: scrollHeight.value,
        animated: true,
      });
    }
  }, [scrollRef, messages, toAccount, message, scrollHeight, socket]);

  return {
    navigation,
    otherAccount,
    getDate,
    displayFrame,
    keyboardHeight,
    scrollHeight,
    handlerMessage,
    messages,
    scrollRef,
    message,
    fromAccount,
  };
};
