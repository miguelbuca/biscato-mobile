import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { useAccountController } from "./controller/Account";

const Account = () => {
  const { items } = useAccountController();
  return (
    <FlatList
      data={items}
      className="flex-1 dark:bg-black pt-28"
      renderItem={({ item, index }) => (
        <View
          className={`flex flex-row bg-white dark:bg-[#222] p-4 py-5 border-b border-[#f8f8f8] dark:border-b-[#222] ${
            index === items.length - 1 ? "border-b" : "dark:border-b-[#111]"
          }`}
        >
          <View className="flex flex-1">
            <Text className="dark:text-white font-bold">{item.label}</Text>
          </View>
          <View>
            <Text className="dark:text-white opacity-70">{item.value}</Text>
          </View>
        </View>
      )}
    />
  );
};
export default Account;
