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
import { useChatController } from "./controller/Chat";
import normalize from "@/src/helper/normalize";

import SvgSend from "@/src/assets/svg/form/send.svg";
import MessageCard from "@/src/components/messageCard";
import { BlurView } from "expo-blur";

const Chat = () => {
  const {
    displayFrame,
    keyboardHeight,
    scrollHeight,
    message,
    messages,
    fromAccount,
    scrollRef,
    handlerMessage,
    getDate,
  } = useChatController();
  return (
    <View className="flex-1 border-t border-t-[#f5f5f5]  flex flex-col bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        className="flex-1 p-4 pb-80"
        onScroll={({ nativeEvent }) => {
          scrollHeight.value = nativeEvent.contentSize.height;
        }}
      >
        {messages.value.map((item, index, arr) => {
          const date = getDate(item.createdAt);
          return (
            <View
              style={{
                marginBottom:
                  index === arr.length - 1
                    ? !keyboardHeight.value
                      ? normalize(180)
                      : normalize(keyboardHeight.value + 180)
                    : 0,
              }}
              key={index}
            >
              {date && (
                <View className="relative border-b border-[#f3f3f3] flex items-center justify-center my-4">
                  <View className="absolute bg-white mt-2 px-4">
                    <Text className=" text-[9px] opacity-70 ">{date}</Text>
                  </View>
                </View>
              )}
              <MessageCard
                isSender={item.fromAccount === fromAccount}
                data={item}
              />
            </View>
          );
        })}
      </ScrollView>
      <BlurView
        style={{
          display: displayFrame.value ? "none" : "flex",
          bottom: keyboardHeight.value,
        }}
        className="absolute w-full"
      >
        <View
          style={{
            marginBottom: !keyboardHeight.value ? normalize(12) : 0,
          }}
          className="flex flex-row p-4 items-center"
        >
          <TextInput
            value={message.value}
            onChangeText={(text) => (message.value = text)}
            className="flex-1 border bg-white border-[#e2e2e2] px-4 h-[35px] rounded-full mr-2"
            placeholder="Mensagem"
            placeholderTextColor={"#ccc"}
          />
          <TouchableOpacity onPress={handlerMessage}>
            <View className="flex justify-center items-center bg-primary h-[35px] w-[35px] rounded-full">
              <SvgSend
                height={normalize(30)}
                width={normalize(30)}
                fill={"#fff"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

export default Chat;
