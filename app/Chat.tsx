import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useChatController } from "./controller/Chat";
import normalize from "@/src/helper/normalize";

import SvgSend from "@/src/assets/svg/form/send.svg";
import MessageCard from "@/src/components/messageCard";
import { BlurView } from "expo-blur";
import { Avatar } from "@/src/components";

import * as Constants from "expo-constants";

const Chat = () => {
  const {
    navigation,
    otherAccount,
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle(props: { children: string; tintColor?: string | undefined }) {
        return (
          <View className="flex flex-row items-center justify-self-start w-full">
            <View>
              <Avatar
                image={`${Constants.default.expoConfig?.extra?.api}/${otherAccount.value?.persons?.[0]?.avatar}`}
                imageStyle={{
                  height: normalize(35),
                  width: normalize(35),
                }}
                className="flex items-center h-[25px] w-[25px] border-transparent"
              />
            </View>
            <View className="ml-3">
              <Text className="text-xs font-semibold">{`${otherAccount.value?.firstName} ${otherAccount.value?.lastName}`}</Text>
              <Text className="text-[10px] opacity-70">Chat</Text>
            </View>
          </View>
        );
      },
    });
  }, [otherAccount]);

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
        intensity={300}
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
