import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useChatController } from "./controller/Chat";
import normalize from "@/src/helper/normalize";

import SvgSend from "@/src/assets/svg/form/send.svg";
import MessageCard from "@/src/components/messageCard";
import { BlurView } from "expo-blur";
import { Avatar } from "@/src/components";

import { baseURL } from "@/src/api";
import HeaderBackground from "@/src/components/HeaderBackground";

const Chat = () => {
  const {
    navigation,
    otherAccount,
    message,
    messages,
    fromAccount,
    scrollRef,
    handlerMessage,
    getDate,
    colorScheme,
  } = useChatController();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle(props: { children: string; tintColor?: string | undefined }) {
        return (
          <View className="flex flex-row items-center justify-self-start w-full">
            <View>
              <Avatar
                image={`${baseURL}/${otherAccount.value?.Person?.avatar}`}
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
      headerShown: true,
      headerTransparent: true,
      headerBackground: () => <HeaderBackground />,
    });
  }, [otherAccount]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      className="flex-1 border-t border-t-[#f5f5f5]  flex flex-col bg-white "
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        className="p-4 py-24 -mb-24"
        data={messages.value}
        renderItem={({ item, index }) => {
          const date = getDate(item.createdAt);
          return (
            <View key={index}>
              {/*date && (
                <View className="relative border-b border-[#f3f3f3] flex items-center justify-center my-4">
                  <View className="absolute bg-white mt-2 px-4">
                    <Text className=" text-[9px] opacity-70 ">{date}</Text>
                  </View>
                </View>
              )*/}
              <MessageCard
                isSender={item.fromAccount === fromAccount}
                data={item}
              />
            </View>
          );
        }}
      />
      <View className="relative bg-transparent">
        <BlurView
          intensity={80}
          tint={colorScheme}
          style={{
            borderTopWidth: 0.2,
            borderTopColor:
              colorScheme === "light" ? "#cccccc" : "rgba(255,255,255,0.1)",
          }}
          className="absolute h-full w-full"
        />
        <SafeAreaView>
          <View className="flex flex-row px-4 py-2 items-center bg-transparent">
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
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
