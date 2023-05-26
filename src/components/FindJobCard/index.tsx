import { View, Text } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { useBetterState } from "@/src/hooks/useBetterState";
import tailwind from "@/tailwind.config";

export interface FindJobCardProps {
  name?: string;
  image?: JSX.Element;
  isChecked?: boolean;
}

export const FindJobCard = ({ name, image, isChecked }: FindJobCardProps) => {
  const checked = useBetterState(isChecked || false);

  return (
    <View className="w-full">
      <View className=" p-4 rounded-md flex flex-col m-2 bg-white h-[200px] shadow-sm">
        <View className="relative flex items-center justify-center  flex-1">
          {image}
          <View className="absolute top-0 right-0">
            <Checkbox
              value={checked.value}
              onValueChange={(value) => (checked.value = value)}
              color={
                checked.value
                  ? (tailwind.theme?.extend?.colors as any).primary
                  : "rgb(107,114,128)"
              }
            />
          </View>
        </View>
        <View>
          <Text className="font-semibold text-gray-500">{name}</Text>
        </View>
      </View>
    </View>
  );
};
