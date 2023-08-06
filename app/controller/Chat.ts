import { Api } from "@/src/api";
import normalize from "@/src/helper/normalize";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Chat, User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useCallback, useEffect, useRef } from "react";
import { Dimensions, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const { height } = Dimensions.get("screen");

export const useChatController = () => {
  const { id: fromAccount }: User = useSelector(AuthSelectors).user;
  const message = useBetterState<string>("");
  const messages = useBetterState<Chat[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const scrollViewHeight = normalize(height - 140, "height");

  const load = useCallback(() => {
    Api.chat
      .messages()
      .then(({ data }) => {
        messages.value = data;
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  useEffect(load, []);

  useEffect(() => {
    return Api.chat.onMessage(`${fromAccount}`, (payload: Chat) => {
      messages.value = [...messages.value, payload];
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    });
  }, [scrollRef, messages, scrollRef, fromAccount]);

  const handlerMessage = useCallback(async () => {
    const { data } = await Api.chat.sendMessage({
      content: message.value,
      toAccount: fromAccount === 1 ? 2 : 1,
    });

    if (data) {
      messages.value = [...messages.value, data];
      message.value = "";
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }
  }, [scrollRef, messages, message]);

  return {
    handlerMessage,
    messages,
    scrollRef,
    message,
    fromAccount,
    scrollViewHeight,
  };
};
