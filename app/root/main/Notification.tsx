import { View, Text, FlatList, Pressable, RefreshControl } from "react-native";
import React from "react";
import { useNotificationController } from "./controller/Notification";
import { AvatarNotification } from "@/src/components";

const Notification = () => {
  const { notifications, handlerOpennedNotification, load, refreshing } =
    useNotificationController();

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing.value} onRefresh={load} />
      }
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
            onPress={() => handlerOpennedNotification(index)}
          >
            <View className="mr-4">
              <View className="min-h-[45px] min-w-[45px] ">
                <AvatarNotification data={item} />
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
