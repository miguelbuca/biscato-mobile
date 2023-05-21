import { View, Text, ViewProps } from "react-native";
import React from "react";

export const SplashScreen = ({ ...args }: ViewProps) => {
  return (
    <View className="flex flex-1 items-center justify-center" {...args}>
      <Text>SplashScreen</Text>
    </View>
  );
};
