import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

import SearchSvg from "@/src/assets/svg/search.svg";
import LogoFontSvg from "@/src/assets/svg/logo-font.svg";
import MenuSvg from "@/src/assets/svg/menu.svg";

export const Header = ({ route }: BottomTabHeaderProps) => {
  //console.log(route.name);
  return (
    <SafeAreaView className="flex justify-center flex-row px-4 pt-6 mb-0 pb-0 border-b bg-white border-b-[#f5f5f5] h-[55px]">
      <TouchableOpacity>
        <View className="relative flex items-start justify-center w-[30px]">
          <MenuSvg height={22} fill={"black"} />
        </View>
      </TouchableOpacity>
      <View className="flex items-center justify-center flex-1">
        {<LogoFontSvg height={25} fill={"black"} />}
      </View>
      <TouchableOpacity>
        <View className="flex items-end justify-center w-[30px]">
          <SearchSvg height={22} fill={"black"} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
