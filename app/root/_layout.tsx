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
import normalize from "@/src/helper/normalize";

import HomeSvg from "@/src/assets/svg/drawer-home.svg";
import UserSvg from "@/src/assets/svg/drawer-user.svg";
import WalletSvg from "@/src/assets/svg/drawer-wallet.svg";
import SettingsSvg from "@/src/assets/svg/drawer-settigs.svg";
import SignOutSvg from "@/src/assets/svg/drawer-signout.svg";

const { width, height } = Dimensions.get("screen");

export default function Layout() {
  const { signOut, user, person } = useLayoutController();

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
                      image={person.avatar}
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
                  <View className="flex flex-row m-2 p-3">
                    <View>
                      <SignOutSvg
                        height={normalize(18)}
                        width={normalize(18)}
                        fill={"rgb(107,114,128)"}
                      />
                    </View>
                    <View className="flex-1 ml-[15px]">
                      <Text className="font-semibold text-gray-500">Sair</Text>
                    </View>
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
            drawerIcon({ color }) {
              return (
                <View className="w-[2px]">
                  <HomeSvg
                    height={normalize(16)}
                    width={normalize(16)}
                    fill={color}
                  />
                </View>
              );
            },
          }}
          name="main"
        />
        <Drawer.Screen
          options={{
            title: "Minha conta",
            drawerIcon({ color }) {
              return (
                <View className="w-[2px]">
                  <UserSvg
                    height={normalize(16)}
                    width={normalize(16)}
                    fill={color}
                  />
                </View>
              );
            },
          }}
          name="Account"
        />
        <Drawer.Screen
          options={{
            title: "Carteira",
            drawerItemStyle:{
              display: 'none'
            },
            drawerIcon({ color }) {
              return (
                <View className="w-[2px]">
                  <WalletSvg
                    height={normalize(17)}
                    width={normalize(17)}
                    fill={color}
                  />
                </View>
              );
            },
          }}
          name="Wallet"
        />
        <Drawer.Screen
          options={{
            title: "Definições",
            drawerIcon({ color }) {
              return (
                <View className="w-[2px]">
                  <SettingsSvg
                    height={normalize(17)}
                    width={normalize(17)}
                    fill={color}
                  />
                </View>
              );
            },
          }}
          name="Settings"
        />
      </Drawer>
      <StatusBar style="dark" />
    </>
  );
}
