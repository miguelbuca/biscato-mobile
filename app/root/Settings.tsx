import { View, Text, Pressable } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";

const Settings = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center dark:bg-slate-800">
      <Pressable onPress={toggleColorScheme}>
        <Text selectable={false} className="dark:text-white">
          {`Try clicking me! ${colorScheme === "dark" ? "🌙" : "🌞"}`}
        </Text>
      </Pressable>
    </View>
  );
};
export default Settings;
