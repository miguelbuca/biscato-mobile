import { View, Text, Pressable, Button } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import * as Notifications from "expo-notifications";

const Settings = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center dark:bg-slate-800">
      {/*<Pressable onPress={toggleColorScheme}>
        <Text selectable={false} className="dark:text-white">
          {`Try clicking me! ${colorScheme === "dark" ? "🌙" : "🌞"}`}
        </Text>
  </Pressable>*/}
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", url: "root/main/Notification" },
    },
    trigger: { seconds: 2 },
  });
}

export default Settings;
