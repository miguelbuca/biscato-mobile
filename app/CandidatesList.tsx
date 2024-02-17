import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useCandidatesListController } from "./controller";
import { SvgXml } from "react-native-svg";
import SvgTimes from "@/src/assets/svg/times.svg";
import normalize from "@/src/helper/normalize";
import { format } from "@/src/helper/format";

const CandidatesList = () => {
  const { candidatures, work, handlerAccept, handlerReject, handlerPortfolio } =
    useCandidatesListController();

  return (
    <FlatList
      className="bg-[#f5f5f5] dark:bg-black pt-28"
      ListHeaderComponent={() => (
        <View className="flex flex-col mt-4 ">
          <View className="bg-white dark:bg-[#222] p-4 flex flex-row rounded-lg mb-2">
            <View className="mr-2">
              <View
                style={{
                  backgroundColor: work?.skillType?.background,
                }}
                className="flex items-center justify-center w-14 h-14 rounded-lg"
              >
                {work?.skillType?.svgXml && (
                  <SvgXml
                    xml={work?.skillType.svgXml}
                    width={24}
                    height={24}
                    fill={"#ffffff"}
                  />
                )}
              </View>
            </View>
            <View className="flex flex-1 flex-col justify-center">
              <Text
                className="font-semibold mb-1 dark:text-white"
                style={{
                  overflow: "hidden",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {work?.title}
              </Text>
              <Text className="dark:text-white">{work?.skillType?.name}</Text>
            </View>
          </View>
          <View className="self-center my-4">
            <Text className="text-xs dark:text-white">
              <Text className="font-bold">Nota: </Text>Clique no cartão para ver
              o portfólio do candidato.
            </Text>
          </View>
        </View>
      )}
      renderItem={({ item, index }) => (
        <Pressable
          className={`bg-white dark:bg-[#222] px-4 flex flex-row items-center py-5 ${
            index === 0 ? "rounded-tl-lg rounded-tr-lg mt-4" : ""
          }  ${
            candidatures.value.length === index + 1
              ? "rounded-bl-lg rounded-br-lg mb-52"
              : "border-b border-b-slate-100 dark:border-b-[#111]"
          }`}
          onPress={() => handlerPortfolio(item.user?.persons?.[0].id)}
          key={index}
        >
          <View className="flex-1 flex-col">
            <Text className="dark:text-white">{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
            <Text className="text-black dark:text-white text-[11px] mt-0.5 opacity-50">
              {format().numberAsFollow(3500)} seguidores
            </Text>
          </View>
          <View className="flex items-center flex-row gap-x-2">
            <TouchableOpacity onPress={handlerAccept}>
              <View className="h-[42px] justify-center items-center bg-primary rounded-lg">
                <Text className="px-3 text-white font-semibold">Aceitar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerReject}>
              <View className="h-[42px] w-[42px] justify-center items-center bg-[#f8f8f8] rounded-lg">
                <SvgTimes
                  height={normalize(25)}
                  width={normalize(25)}
                  fill={"#000000"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
      data={candidatures.value}
    />
  );
};

export default CandidatesList;
