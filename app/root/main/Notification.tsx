import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useNotificationController } from "./controller/Notification";

const Notification = () => {
  const { notifications } = useNotificationController();

  return (
    <FlatList
      className="pt-4"
      data={notifications.value}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            key={index}
            className={`flex p-4 flex-row  ${
              index !== notifications.value.length - 1
                ? "border-b border-slate-100"
                : "mb-8"
            } ${item.status !== "ACTIVE" ? "bg-white" : "bg-blue-100"}`}
          >
            <View className="mr-4">
              <View className="flex items-center justify-center h-[45px] w-[45px] bg-white rounded-full">
                <Text>test</Text>
              </View>
            </View>
            <View className={`flex-1`}>
              <View>
                <Text className="font-semibold">{item.title}</Text>
              </View>
              <View className="my-2">
                <Text
                  style={{
                    overflow: "hidden",
                  }}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  className="text-xs"
                >
                  {item.content}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
};
export default Notification;
