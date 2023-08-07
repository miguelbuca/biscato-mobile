import { getValueFor } from "@/src/helper/storage";
import { Chat } from "@/src/interfaces";
import { AxiosStatic } from "axios";
import { Socket } from "socket.io-client";

export const ChatFunction = (axios: AxiosStatic, socket: Socket) => {
  const sendMessage = async (data: Pick<Chat, "content" | "toAccount">) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Chat>("/chat/messages", {
      ...data,
      socket_id: socket.id,
    });
  };

  const messages = async (toAccount: string) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<Chat[]>(`/chat/messages/${toAccount}`);
  };

  const onMessage = (channel: string, callback?: (payload: Chat) => void) => {
    socket.on(channel, (args) => {
      callback?.(args);
    });
  };

  return {
    messages,
    sendMessage,
    onMessage,
  };
};
