import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Api } from "@/src/api";
import { useChatController } from "./controller/Chat";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import normalize from "@/src/helper/normalize";

const { height } = Dimensions.get("window");

const Chat = () => {
  const { message, messages } = useChatController();
  return (
    <View className="flex-1 flex flex-col bg-white">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="on-drag"
        extraHeight={-70}
        extraScrollHeight={20}
      >
        <ScrollView
          style={{
            height: normalize(height - 170, "height"),
          }}
        >
          {messages.value.map((message,index) => (
            <Text key={index}>{message}</Text>
          ))}
        </ScrollView>
        <View>
          <View className="flex flex-row p-4 items-center">
            <TextInput
              onChangeText={(text) => (message.value = text)}
              className="flex-1 border border-[#e2e2e2] px-4 py-3.5 rounded-full"
              placeholder="message"
            />
            <Button
              onPress={() => {
                Api.chat.sendMessage(message.value);
              }}
              title="Enviar"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Chat;
