import React, { useCallback } from "react";
import { Link, Tabs, useNavigation } from "expo-router";

import HomeSvg from "@/src/assets/svg/home.svg";
import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import BellSvg from "@/src/assets/svg/bell.svg";
import { View, Text, TouchableOpacity } from "react-native";

import SearchSvg from "@/src/assets/svg/search.svg";
import LogoFontSvg from "@/src/assets/svg/logo-font.svg";
import MenuSvg from "@/src/assets/svg/menu.svg";
import ChatSvg from "@/src/assets/svg/chat.svg";

const Layout = () => {
  const SUB_VALUE = 5;
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#cccccc",
          headerTitleAlign: "center",
          tabBarLabelStyle: {
            fontWeight: "800",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={(navigation as any).toggleDrawer}>
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
          headerRight: () =>
            route.name !== "Applied" ? (
              <Link href={"../Find-job"}>
                <View className="relative flex items-start justify-center p-4">
                  <SearchSvg height={22} fill={"black"} />
                </View>
              </Link>
            ) : (
              <Link href={"../Find-job"}>
                <View className="relative flex items-start justify-center p-4">
                  <ChatSvg height={22} fill={"black"} />
                  <View className="absolute w-[15px] h-[15px] rounded-full items-center justify-center bg-primary top-2 left-8">
                    <Text className="text-[10px] text-white">2</Text>
                  </View>
                </View>
              </Link>
            ),
        };
      }}
    >
      <Tabs.Screen
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <HomeSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Home"
      />
      <Tabs.Screen
        options={{
          title: "Arredores",
          tabBarIcon: ({ color, size }) => (
            <MapPinSvg height={size - SUB_VALUE} fill={color} />
          ),
        }}
        name="Nearby"
      />

      <Tabs.Screen
        options={{
          title: "Candidaturas",
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <JobSvg height={size - SUB_VALUE} fill={color} />
              <View className="absolute w-[15px] h-[15px] rounded-full items-center justify-center bg-primary -top-[5px] -right-1.5">
                <Text className="text-[10px] text-white">2</Text>
              </View>
            </View>
          ),
        }}
        name="Applied"
      />
      <Tabs.Screen
        options={{
          title: "notificações",
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <BellSvg height={size - SUB_VALUE} fill={color} />
              {/*<View className="absolute w-[15px] h-[15px] rounded-full items-center justify-center bg-primary -top-[5px] -right-[2px]">
                <Text className="text-[10px] text-white">2</Text>
          </View>*/}
            </View>
          ),
        }}
        name="Notification"
      />
    </Tabs>
  );
};

export default Layout;
