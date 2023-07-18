import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect } from "react";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Api } from "@/src/api";

const Chat = () => {
  const message = useBetterState<string>("");

  useEffect(() => {
    Api.chat.onMessage("message", (res) => console.log({ res }));
  }, []);

  return (
    <View className="p-4">
      <Text className="mb-4">Chat</Text>
      <TextInput
        onChangeText={(text) => (message.value = text)}
        className="mb-4 border p-4"
        placeholder="message"
      />
      <Button
        onPress={() => {
          Api.chat.sendMessage(message.value);
        }}
        title="Enviar"
      />
    </View>
  );
};

export default Chat;
