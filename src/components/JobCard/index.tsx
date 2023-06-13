import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";

import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import ClockSvg from "@/src/assets/svg/clock.svg";
import { SkillType, Work } from "@/src/interfaces";
import { SvgXml } from "react-native-svg";
import { format } from "@/src/helper/format";
import { useNavigation } from "expo-router";

export interface JobCardProps {
  data: Work;
  isLastChild?: boolean;
}

export const JobCard = ({ data, isLastChild }: JobCardProps) => {
  const { navigate }: any = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigate("Work", {
          ...data,
        })
      }
    >
      <View
        className={`flex flex-col  py-4 ${
          !isLastChild && "border-b border-[#f8f8f8]"
        }`}
      >
        <View className="flex flex-row mb-5">
          <View
            style={{
              backgroundColor: data.skillType?.background,
            }}
            className="flex items-center justify-center w-14 h-14 rounded-lg"
          >
            {data.skillType?.svgXml && (
              <SvgXml
                xml={data.skillType.svgXml}
                width={24}
                height={24}
                fill={"#ffffff"}
              />
            )}
          </View>
          <View className="flex flex-col flex-1">
            <View className="ml-2 flex-1">
              <View className="flex justify-center flex-1">
                <Text className="text-[16px] font-semibold">{data.title}</Text>
              </View>
              <View className="flex flex-row justify-between">
                <TouchableOpacity>
                  <Text className="text-xs">{data.skillType?.name}</Text>
                </TouchableOpacity>
                <Text className="text-primary font-semibold">
                  {format().amount(data.costPerHour || 0)}/hr
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center">
            <MapPinSvg height={14} fill={"rgb(107,114,128)"} />
            <Text className="text-xs font-semibold text-gray-500">
              {data.address ? data.address.name : "Não definido"}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <JobSvg height={14} fill={"rgb(107,114,128)"} />
            <Text className="text-xs font-semibold text-gray-500">
              {format().time(data?.time)}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <ClockSvg width={14} height={14} fill={"rgb(107,114,128)"} />
            <Text className="ml-2 text-xs font-semibold text-gray-500">
              {data.totalTime}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
