import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";

import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import { SkillType, Work } from "@/src/interfaces";
import { SvgXml } from "react-native-svg";

export interface JobCardProps {
  data: Work & { skillType?: SkillType };
  isLastChild?: boolean;
}

export const JobCard = ({ data, isLastChild }: JobCardProps) => {
  return (
    <Pressable>
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
                <Text className="text-[16px] font-semibold">Barbeiro</Text>
              </View>
              <View className="flex flex-row justify-between">
                <TouchableOpacity>
                  <Text className="text-xs">{data.skillType?.name}</Text>
                </TouchableOpacity>
                <Text className="text-primary font-semibold">$1500/hrs</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center">
            <MapPinSvg height={14} fill={"rgb(107,114,128)"} />
            <Text className="text-xs font-semibold text-gray-500">Golf 2</Text>
          </View>
          <View className="flex flex-row items-center">
            <JobSvg height={14} fill={"rgb(107,114,128)"} />
            <Text className="text-xs font-semibold text-gray-500">Mensal</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="text-xs font-semibold text-gray-500">
              {" • "}3d
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
