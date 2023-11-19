import React from "react";
import { Link, Tabs } from "expo-router";

import HomeSvg from "@/src/assets/svg/home.svg";
import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import BellSvg from "@/src/assets/svg/bell.svg";
import { View, Text, TouchableOpacity, Platform } from "react-native";

import ShortSvg from "@/src/assets/svg/short.svg";
import LogoFontSvg from "@/src/assets/svg/logo-font.svg";
import MenuSvg from "@/src/assets/svg/menu.svg";
import ChatSvg from "@/src/assets/svg/chat.svg";
import { useLayoutController } from "./controller";
import { BlurView } from "expo-blur";

import config from "@/tailwind.config";
import { StatusBar } from "expo-status-bar";
import HeaderBackground from "@/src/components/HeaderBackground";

const Layout = () => {
  const { SUB_VALUE, navigation, user, notifications, chat, colorScheme } =
    useLayoutController();

  return (
    <>
      <Tabs
        initialRouteName="Home"
        screenOptions={({ route }) => {
          return {
            tabBarActiveTintColor: (
              config.theme?.extend?.colors as { primary: string }
            )?.primary,
            tabBarInactiveTintColor:
              colorScheme === "light"
                ? "rgba(0,0,0,0.5)"
                : "rgba(255,255,255,0.5)",
            headerTitleAlign: "center",
            tabBarLabelStyle: {
              fontWeight: "700",
            },
            headerTransparent: true,
            headerBackground: () => <HeaderBackground />,
            tabBarStyle: {
              position: "absolute",
              borderTopWidth: 0.2,
              borderTopColor:
                colorScheme === "light" ? "#cccccc" : "rgba(255,255,255,0.1)",
            },
            tabBarBackground:
              Platform.OS === "ios"
                ? () => (
                    <BlurView
                      intensity={50}
                      tint={colorScheme}
                      className="absolute w-full h-full"
                    />
                  )
                : () => (
                    <View
                      style={{
                        borderTopWidth: 0.5,
                        borderTopColor:
                          colorScheme === "light"
                            ? "rgba(0,0,0,0.1)"
                            : "rgba(255,255,255,0.1)",
                      }}
                      className="absolute w-full h-full bg-white dark:bg-black"
                    />
                  ),
            headerLeft: () => (
              <TouchableOpacity onPress={(navigation as any).toggleDrawer}>
                <View className="relative flex items-start justify-center p-4 -z-1">
                  <MenuSvg
                    height={22}
                    fill={colorScheme === "light" ? "black" : "#fff"}
                  />
                </View>
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <View className="flex items-center justify-center flex-1">
                {
                  <LogoFontSvg
                    height={25}
                    fill={colorScheme === "light" ? "black" : "#fff"}
                  />
                }
              </View>
            ),
            headerRight: () =>
              route.name !== "Applied" ? (
                <Link href={"/Find-job"}>
                  <View className="relative flex items-start justify-center p-4">
                    <ShortSvg
                      height={20}
                      width={20}
                      fill={colorScheme === "light" ? "black" : "#fff"}
                    />
                  </View>
                </Link>
              ) : (
                <Link href={`/Chat?toAccount=${user.id === 1 ? "2" : "1"}`}>
                  <View className="relative flex items-start justify-center p-4">
                    <ChatSvg
                      height={22}
                      fill={colorScheme === "light" ? "black" : "#fff"}
                    />
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
            tabBarIcon: ({ focused, color, size }) => (
              <View className="relative">
                <JobSvg height={size - SUB_VALUE} fill={color} />
                {!focused && chat.value ? (
                  <View className="absolute w-[15px] h-[15px] rounded-full items-center justify-center bg-primary -top-[5px] -right-1.5">
                    <Text className="text-[10px] text-white">{chat.value}</Text>
                  </View>
                ) : null}
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
                {notifications ? (
                  <View className="absolute w-[15px] h-[15px] rounded-full items-center justify-center bg-primary -top-[5px] -right-[2px]">
                    <Text className="text-[10px] text-white">
                      {notifications}
                    </Text>
                  </View>
                ) : null}
              </View>
            ),
          }}
          name="Notification"
        />
      </Tabs>
      <StatusBar style={colorScheme !== "light" ? "light" : "dark"} />
    </>
  );
};

export default Layout;
