import { View, ScrollView, Text, Image } from "react-native";
import React from "react";
import { usePortfolioController } from "./controller";
import { baseURL } from "@/src/api";
import normalize from "@/src/helper/normalize";
import { format } from "@/src/helper/format";
import ShareSvg from "@/src/assets/svg/share.svg";
import PlusSvg from "@/src/assets/svg/plus.svg";

const Portfolio = () => {
  const { logged, user, isMyPortfolio } = usePortfolioController();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 border-t-slate-100 border-t">
        <View className="flex flex-row items-center gap-x-3 px-4 py-6">
          <View>
            <Image
              style={{
                height: normalize(80),
                width: normalize(80),
                borderRadius: 50,
              }}
              source={{
                uri: `${baseURL}/${user.value?.persons?.[0].avatar}`,
              }}
            />
          </View>
          <View className="flex flex-col">
            <Text className="font-bold text-sm">{`${user.value?.firstName} ${user.value?.lastName}`}</Text>
            <Text className="text-sm">UI/UX Design</Text>
            <View className="flex flex-row mt-1 gap-x-2 items-center">
              <Text className="text-[11px] text-gray-500">
                {format().numberAsFollow(1270)} Seguidores
              </Text>
              <Text className="text-[11px] text-gray-500">
                {format().numberAsFollow(5)} Seguindo
              </Text>
              <Text className="text-[11px] text-gray-500">
                {format().numberAsFollow(9435, 2)} Curtidas
              </Text>
            </View>
          </View>
        </View>
        <View className="px-4">
          <View className="flex flex-col">
            <Text className="font-semibold text-xs">About</Text>
            <Text
              className="my-2 text-xs"
              style={{
                overflow: "hidden",
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-x-3 px-4 my-3">
          <View className="flex flex-row justify-around flex-1 items-center max-h-[42px] px-7 py-3 rounded-lg bg-primary">
            <PlusSvg
              width={normalize(13)}
              height={normalize(13)}
              fill={"#ffffff"}
            />
            <Text className="text-white font-semibold"> Seguir</Text>
          </View>
          <View className="flex flex-1 items-center justify-center max-h-[42px] px-7 py-3 rounded-lg bg-[#f8f8f8]">
            <Text className="text-black font-semibold">Mensagem</Text>
          </View>
          <View className="flex items-center justify-center px-7 max-h-[42px] py-3 rounded-lg bg-[#f8f8f8]">
            <ShareSvg
              width={normalize(15)}
              height={normalize(15)}
              fill={"#000000"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Portfolio;
