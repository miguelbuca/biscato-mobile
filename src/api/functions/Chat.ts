import { getValueFor } from "@/src/helper/storage";
import { Socket } from "socket.io-client";

export const ChatFunction = (socket: Socket) => {
  const sendMessage = async (message: string) => {
    socket.emit("message", message);
  };

  const onMessage = (callback?: (message: string) => void) => {
    socket.on("message", (args) => {
      callback?.(args);
    });
  };

  return {
    sendMessage,
    onMessage,
  };
};
