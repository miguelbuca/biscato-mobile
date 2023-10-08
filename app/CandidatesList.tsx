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
import SvgTimes from '@/src/assets/svg/times.svg';
import SvgCorrect from "@/src/assets/svg/correct.svg";
import normalize from "@/src/helper/normalize";

const CandidatesList = () => {
  const { candidatures, work, handlerAccept, handlerReject } =
    useCandidatesListController();

  return (
    <FlatList
      ListHeaderComponent={() => (
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
      )}
      renderItem={({ item, index }) => (
        <Pressable
          className={`bg-white px-2 flex flex-row items-center py-4 ${
            index === 0 ? "rounded-tl-lg rounded-tr-lg mt-4" : ""
          }  ${
            candidatures.value.length === index + 1
              ? "rounded-bl-lg rounded-br-lg mb-4"
              : "border-b border-b-slate-100"
          }`}
          key={index}
        >
          <View className="flex-1 flex-col">
            <Text>{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
            <Text className="text-xs opacity-50">
              {item.user?.persons?.[0].phoneNumber}
            </Text>
          </View>
          <View className="flex flex-row gap-x-4">
            <TouchableOpacity onPress={handlerAccept}>
              <View className="h-[40px] w-[40px] justify-center items-center bg-blue-400 rounded-full">
                <SvgCorrect
                  height={normalize(25)}
                  width={normalize(25)}
                  fill={"#fff"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerReject}>
              <View className="h-[40px] w-[40px] justify-center items-center bg-red-500 rounded-full">
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
