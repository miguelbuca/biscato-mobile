import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Work } from "@/src/interfaces";
import { SvgXml } from "react-native-svg";
import { format } from "@/src/helper/format";
import { Link } from "expo-router";

export interface PostCardProps {
  data: Work & {
    _count: {
      applications: number;
      interactions: number;
    };
  };
}

export const PostCard = ({ data }: PostCardProps) => {

  return (
    <View className="flex flex-col border border-gray-100 rounded-lg p-4  min-h-[280px] w-[300px] mx-2">
      <View className="flex flex-col flex-1 pb-2">
        <View className="flex flex-row gap-x-3 items-center">
          <View>
            <View
              style={{
                backgroundColor: data.skillType?.background,
              }}
              className="flex items-center justify-center h-[50px] w-[50px] p-4 rounded-lg"
            >
              <SvgXml xml={data.skillType?.svgXml || ""} fill={`#ffffff`} />
            </View>
          </View>
          <View className="flex flex-col">
            <View>
              <Text className="font-black max-w-[200px]">{data.title}</Text>
            </View>
            <View>
              <Text className="text-xs mt-1">{data.skillType?.name}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-1 flex-col justify-center mt-4 py-2 border-t border-gray-100">
          <View className="flex flex-row gap-x-3 my-1">
            <Text className="font-semibold">Cadidaturas</Text>
            <Text>{data?._count.applications}</Text>
          </View>
          <View className="flex flex-row gap-x-3 my-1">
            <Text className="font-semibold">Valor</Text>
            <Text>{format().amount(data.costPerHour || 0)}(hora)</Text>
          </View>
          <View className="flex flex-row gap-x-3 my-1">
            <Text className="font-semibold">Estado</Text>
            <Text
              className="font-semibold text-xs"
              style={{
                color: data.status === "ACTIVE" ? "green" : "orangered",
              }}
            >
              {format().state(data?.status)}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex">
        <Link href={`../../CandidatesList?id=${data.id}`}>
          <View className="flex items-center justify-center rounded-lg bg-black  px-5 h-[42px]">
            <Text className="font-bold text-xs text-white">Ver candidatos</Text>
          </View>
        </Link>
      </View>
    </View>
  );
};
