import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/tailwind.config";

import MenuSvg from "@/src/assets/svg/menu.svg";

export default function Layout() {
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
              <View className="flex min-h-[200px] bg-primary">
                <SafeAreaView className="flex flex-col justify-center flex-1 px-[18px]"></SafeAreaView>
              </View>
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <TouchableOpacity>
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
            drawerItemStyle: {
              display: "none",
            },
          }}
          name="Find-job"
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
