import { View, Text, FlatList } from "react-native";
import React from "react";
import { useAccountController } from "./controller/Account";
import { Link } from "expo-router";
import { Avatar } from "@/src/components";
import { baseURL } from "@/src/api";

const Account = () => {
  const { items, user, selectedPersonIndex } = useAccountController();
  return (
    <FlatList
      data={items}
      className="flex-1 dark:bg-black pt-28"
      ListHeaderComponent={() => {
        return (
          <View className="my-4 flex flex-col">
            <View className="items-center justify-center">
              <Avatar
                withUpload
                letters={`${user?.firstName?.[0] && user?.firstName?.[0]} ${
                  user?.lastName?.[0] && user?.lastName?.[0]
                }`}
                image={`${baseURL}/${user.persons?.[selectedPersonIndex]?.avatar}`}
                className="h-[90px] w-[90px] border-[transparent]"
              />
            </View>
            <View className="flex-row my-4 items-center justify-center">
              <Link
                selectionColor={"transparent"}
                href={"/Portfolio?userId=" + user.id}
              >
                <Text className="font-semibold dark:text-white">Portfólio</Text>
               
              </Link>
            </View>
          </View>
        );
      }}
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
