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
      ListHeaderComponent={() => (
        <View className="flex flex-col">
          <View className="bg-white p-2 flex flex-row rounded-lg mb-2">
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
                className="font-semibold mb-1"
                style={{
                  overflow: "hidden",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {work?.title}
              </Text>
              <Text>{work?.skillType?.name}</Text>
            </View>
          </View>
          <View className="self-center my-4">
            <Text className="text-xs">
              <Text className="font-bold">Nota: </Text>Clique no cartão para ver
              o portfólio do candidato.
            </Text>
          </View>
        </View>
      )}
      renderItem={({ item, index }) => (
        <Pressable
          className={`bg-white px-2 flex flex-row items-center py-5 ${
            index === 0 ? "rounded-tl-lg rounded-tr-lg mt-4" : ""
          }  ${
            candidatures.value.length === index + 1
              ? "rounded-bl-lg rounded-br-lg mb-4"
              : "border-b border-b-slate-100"
          }`}
          onPress={() => handlerPortfolio(item.user?.id)}
          key={index}
        >
          <View className="flex-1 flex-col">
            <Text>{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
            <Text className="text-black text-[11px] mt-0.5 opacity-50">
              {format().numberAsFollow(3500)} seguidores
            </Text>
          </View>
          <View className="flex items-center flex-row gap-x-2">
            <TouchableOpacity onPress={handlerAccept}>
              <View className="min-h-[35px] justify-center items-center bg-blue-400 rounded-full">
                <Text className="px-3 py-2 text-white font-semibold">
                  Aceitar
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerReject}>
              <View className="h-[35px] w-[35px] justify-center items-center bg-gray-300 rounded-full">
                <SvgTimes
                  height={normalize(25)}
                  width={normalize(25)}
                  fill={"#fff"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
      data={candidatures.value}
      className="p-4"
    />
  );
};

export default CandidatesList;
