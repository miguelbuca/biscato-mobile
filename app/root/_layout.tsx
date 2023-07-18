import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/tailwind.config";

import MenuSvg from "@/src/assets/svg/menu.svg";
import { Avatar } from "@/src/components";
import { useLayoutController } from "./controller";

import BgSvg from "@/src/assets/svg/bg.svg";

const { width, height } = Dimensions.get("screen");

export default function Layout() {
  const { signOut, user } = useLayoutController();

  return (
    <>
      <Drawer
        screenOptions={({ navigation }) => {
          return {
            drawerInactiveTintColor: "rgb(107,114,128)",
            drawerActiveTintColor: (
              theme?.extend?.colors as { primary: string }
            ).primary,
            headerLeft: () => (
              <TouchableOpacity onPress={(navigation as any).toggleDrawer}>
                <View className="relative flex items-start justify-center p-4">
                  <MenuSvg height={22} fill={"black"} />
                </View>
              </TouchableOpacity>
            ),
          };
        }}
        drawerContent={(props) => {
          return (
            <View className="flex-1">
              <View className="flex min-h-[250px] bg-primary">
                <View className="absolute w-full h-full overflow-hidden">
                  <BgSvg
                    width={width}
                    height={height}
                    fill={"rgba(255,255,255,0.5)"}
                  />
                </View>
                <SafeAreaView className="flex flex-col items-center justify-center flex-1 px-[18px]">
                  <View className="mb-2">
                    <Avatar
                      letters={`${
                        user?.firstName?.[0] && user?.firstName?.[0]
                      } ${user?.lastName?.[0] && user?.lastName?.[0]}`}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                    className="px-4 py-2 my-4 rounded-full"
                  >
                    <Text className="text-white font-semibold">{`${user?.firstName} ${user?.lastName}`}</Text>
                  </View>
                </SafeAreaView>
              </View>
              <DrawerContentScrollView
                contentContainerStyle={{
                  marginTop: 0,
                }}
                {...props}
              >
                <DrawerItemList {...props} />
                <TouchableOpacity onPress={signOut}>
                  <View className="m-2 p-3 rounded-md">
                    <Text className="font-semibold text-gray-500">Sair</Text>
                  </View>
                </TouchableOpacity>
              </DrawerContentScrollView>
            </View>
          );
        }}
      >
        <Drawer.Screen
          options={{
            title: "Início",
            headerShown: false,
          }}
          name="main"
        />
        <Drawer.Screen
          options={{
            title: "Minha conta",
          }}
          name="Account"
        />
        <Drawer.Screen
          options={{
            title: "Definições",
          }}
          name="Settings"
        />
      </Drawer>
      <StatusBar style="dark" />
    </>
  );
}
