import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ViewProps } from "react-native";
import { getValueFor } from "../helper/storage";
import { Socket, io } from "socket.io-client";
import * as Constants from "expo-constants";
import { Chat, User } from "../interfaces";
import { useSelector } from "react-redux";
import { AuthSelectors } from "../reduxStore/slices/auth";

export const SocketContext = createContext<{
  socket?: Socket;
}>({
  socket: undefined,
});

export const SocketProvider: React.FC<ViewProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const { url, port } = Constants.default.expoConfig?.extra?.api;
  //const baseURL = `${url}:${port["ws"]}`;

  const init = useCallback(() => {
   /* getValueFor("access_token").then(async (token) => {
      const connection = io(baseURL, {
        autoConnect: true,
        auth: {
          token,
        },
      });
      setSocket(connection);
    });*/
  }, []);

  useEffect(init, []);

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
