import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export const PostCard = () => {
  return (
    <View className="flex flex-col border border-gray-100 rounded-lg p-4  min-h-[220px] w-[190px] mx-2">
      <View className="flex flex-col flex-1 pb-2">
        <View className="flex flex-1">
          <Text>PostCard</Text>
        </View>
        <View>
          <Text>PostCard</Text>
        </View>
      </View>
      <View className="flex">
        <TouchableOpacity>
          <View className="flex items-center justify-center rounded-lg bg-black  px-5 h-[42px]">
            <Text className="font-bold text-xs text-white">Ver mais</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
