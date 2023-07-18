import { Socket } from "socket.io-client";

export const ChatFunction = (socket: Socket) => {


  const sendMessage = async (message: string) => {
    //const access_token = await getValueFor("access_token");
    //axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    socket.emit("message", message)
    
  };

  const onMessage = socket.on

  return {
    sendMessage,
    onMessage,
  };
};
