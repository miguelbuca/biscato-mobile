import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Api } from "@/src/api";
import { useChatController } from "./controller/Chat";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import normalize from "@/src/helper/normalize";

import tailwind from "../tailwind.config";

import SvgSend from "@/src/assets/svg/form/send.svg";
import MessageCard from "@/src/components/messageCard";

const Chat = () => {
  const {
    message,
    messages,
    fromAccount,
    scrollRef,
    scrollViewHeight: height,
    handlerMessage,
  } = useChatController();
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
          ref={scrollRef}
          className="p-4"
          style={{
            height,
          }}
        >
          {messages.value.map((item, index, arr) => (
            <View
              style={{
                paddingBottom: index === arr.length - 1 ? normalize(40) : 0,
              }}
              key={index}
            >
              <MessageCard
                isSender={item.fromAccount === fromAccount}
                data={item}
              />
            </View>
          ))}
        </ScrollView>
        <View className="border-t border-t-[#e2e2e2]">
          <View className="flex flex-row p-4 items-center">
            <TextInput
              value={message.value}
              onChangeText={(text) => (message.value = text)}
              className="flex-1 border border-[#e2e2e2] px-4 py-3.5 rounded-full mr-2"
              placeholder="Mensagem"
            />
            <TouchableOpacity onPress={handlerMessage}>
              <View className="flex justify-center items-center bg-[#e2e2e2] h-[45px] w-[45px] rounded-full">
                <SvgSend
                  height={normalize(30)}
                  width={normalize(30)}
                  fill={
                    message.value
                      ? (tailwind.theme?.extend?.colors as any).primary
                      : "rgba(0,0,0,0.4)"
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Chat;
