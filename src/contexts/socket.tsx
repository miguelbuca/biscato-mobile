import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ViewProps } from "react-native";
import { getValueFor } from "../helper/storage";
import { Socket, io } from "socket.io-client";
import * as Constants from "expo-constants";

import notifee, {
  AndroidImportance,
  EventType,
  Notification,
} from "@notifee/react-native";
import { Chat, User } from "../interfaces";
import { useSelector } from "react-redux";
import { AuthSelectors } from "../reduxStore/slices/auth";

export const SocketContext = createContext<{
  socket?: Socket;
}>({
  socket: undefined,
});

export const SocketProvider: React.FC<ViewProps> = ({ children }) => {
  const user: User = useSelector(AuthSelectors).user;
  const [socket, setSocket] = useState<Socket>();
  const { url, port } = Constants.default.expoConfig?.extra?.api;
  const baseURL = `${url}:${port["ws"]}`;

  const handlerMessageNotification = async (notification: Notification) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "message",
      name: "chat",
      vibration: true,
      importance: AndroidImportance.DEFAULT,
    });

    await notifee.displayNotification({
      ...notification,
      android: {
        channelId,
      },
    });
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("cancelou");
          break;
        case EventType.ACTION_PRESS:
          console.log("pressionou");
          break;
      }
    });
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ detail }) => {
      
    });
  }, []);

  const init = useCallback(() => {
    getValueFor("access_token").then(async (token) => {
      if (!token) return;

      const connection = io(baseURL, {
        autoConnect: true,
        auth: {
          token,
        },
      });
      setSocket(connection);
    });
  }, []);

  useEffect(init, []);

  useEffect(() => {
    socket?.on("message", (message: Chat) => {
      if (message.receiver?.id !== user?.id) return;
      handlerMessageNotification({
        title: `${message.sender?.firstName} ${message.sender?.lastName}`,
        body: message.content,
        data: { ...message },
      });
    });
  }, [socket, user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
