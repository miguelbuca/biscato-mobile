import { View, Text, Image } from "react-native";
import React from "react";
import { usePortfolioController } from "./controller";
import { baseURL } from "@/src/api";
import normalize from "@/src/helper/normalize";
import { format } from "@/src/helper/format";
import ShareSvg from "@/src/assets/svg/share.svg";
import PlusSvg from "@/src/assets/svg/plus.svg";
import MasonryList from "@react-native-seoul/masonry-list";
import { WorkCard } from "@/src/components";

const Portfolio = () => {
  const { user, portfolioInfo, data, getWorkCardStyles, isMyPortfolio } =
    usePortfolioController();

  return (
    <View className="flex-1 dark:bg-black">
      <MasonryList
        style={{
          flex: 1,
        }}
        ListHeaderComponent={
          <View className="p-4 my-4 mt-28 bg-white dark:bg-[#222] mx-3 rounded-xl">
            <View className="flex flex-row items-center gap-x-3 py-6">
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
                <Text className="font-bold text-sm dark:text-white">{`${user.value?.firstName} ${user.value?.lastName}`}</Text>
                <Text className="text-sm dark:text-white">{portfolioInfo.value?.title}</Text>
                <View className="flex flex-row mt-1 gap-x-2 items-center">
                  <Text className="text-[11px] text-gray-500">
                    {format().numberAsFollow(1270)} Seguidores
                  </Text>
                  <Text className="text-[11px] text-gray-500">
                    {format().numberAsFollow(5)} Seguindo
                  </Text>
                  <Text className="text-[11px] text-gray-500">
                    {format().numberAsFollow(1050, 2)} Biscatos
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View className="flex flex-col">
                <Text className="font-semibold text-xs dark:text-white">
                  About
                </Text>
                <Text
                  className="my-2 text-xs dark:text-white"
                  style={{
                    overflow: "hidden",
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {portfolioInfo.value?.biography}
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-x-3 my-3">
              <View className="flex flex-row justify-around flex-1 items-center max-h-[42px] px-7 py-3 rounded-lg bg-primary">
                <PlusSvg
                  width={normalize(13)}
                  height={normalize(13)}
                  fill={"#ffffff"}
                />
                <Text className="text-white font-semibold">
                  {isMyPortfolio ? " Biscato" : " Seguir"}
                </Text>
              </View>
              <View className="flex flex-1 items-center justify-center max-h-[42px] px-7 py-3 rounded-lg bg-[#f8f8f8]">
                <Text className="text-black font-semibold">
                  {isMyPortfolio ? "Editar" : "Mensagem"}
                </Text>
              </View>
              <View className="flex  items-center justify-center px-7 max-h-[42px] py-3 rounded-lg bg-[#f8f8f8]">
                <ShareSvg
                  width={normalize(15)}
                  height={normalize(15)}
                  fill={"#000000"}
                />
              </View>
            </View>
          </View>
        }
        data={data.value}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }: any) => (
          <WorkCard item={item} style={getWorkCardStyles(i)} />
        )}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Portfolio;
