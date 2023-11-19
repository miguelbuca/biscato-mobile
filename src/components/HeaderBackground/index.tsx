import { View, Text, Platform } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useHeaderBackgroundController } from "./controller";
import { StatusBar } from "expo-status-bar";

const HeaderBackground = () => {
  const { colorScheme } = useHeaderBackgroundController();
  return Platform.OS === "ios" ? (
    <BlurView
      intensity={80}
      tint={colorScheme}
      style={{
        borderBottomWidth: 0.2,
        borderBottomColor:
          colorScheme === "light" ? "#cccccc" : "rgba(255,255,255,0.1)",
      }}
      className="absolute w-full h-full z-[-100]"
    />
  ) : (
    <View
      style={{
        borderBottomWidth: colorScheme === "light" ? 0.5 : 0.5,
        borderBottomColor:
          colorScheme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
      }}
      className="absolute w-full h-full z-[-100] bg-white dark:bg-black"
    />
  );
};

export default HeaderBackground;
