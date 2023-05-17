import React from "react";
import { Tabs } from "expo-router";

import HomeSvg from "@/src/assets/svg/home.svg";
import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import BellSvg from "@/src/assets/svg/bell.svg";
import { View, Text, TouchableOpacity } from "react-native";

import SearchSvg from "@/src/assets/svg/search.svg";
import LogoFontSvg from "@/src/assets/svg/logo-font.svg";
import MenuSvg from "@/src/assets/svg/menu.svg";

const Layout = () => {
  const SUB_VALUE = 5;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#cccccc",
        headerLeft: () => (
          <TouchableOpacity>
            <View className="relative flex items-start justify-center p-4">
              <MenuSvg height={22} fill={"black"} />
            </View>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <View className="flex items-center justify-center flex-1">
            {<LogoFontSvg height={25} fill={"black"} />}
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity>
            <View className="relative flex items-start justify-center p-4">
              <SearchSvg height={22} fill={"black"} />
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Home"
      />
      <Tabs.Screen
        options={{
          title: "Nearby",
          tabBarIcon: ({ color, size }) => (
            <MapPinSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Nearby"
      />

      <Tabs.Screen
        options={{
          title: "Applied",
          tabBarIcon: ({ color, size }) => (
            <JobSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Applied"
      />
      <Tabs.Screen
        options={{
          title: "Notification",
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <BellSvg height={size - SUB_VALUE} fill={color} />
              <View className="absolute w-[15px] h-[15px] rounded-full items-center justify-center bg-primary -top-[5px] -right-[2px]">
                <Text className="text-[10px] text-white">2</Text>
              </View>
            </View>
          ),
        }}
        name="Notification"
      />
    </Tabs>
  );
};

export default Layout;
