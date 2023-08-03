import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const useChatController = () => {
  const message = useBetterState<string>("");
  const messages = useBetterState<string[]>([]);

  useEffect(() => {
    return Api.chat.onMessage((message: string) => {
      messages.value = [...messages.value,message]
    });
  }, []);

  return {
    message,
    messages
  };
};
