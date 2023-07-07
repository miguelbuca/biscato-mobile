import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";

import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import ClockSvg from "@/src/assets/svg/clock.svg";
import { Work } from "@/src/interfaces";
import { SvgXml } from "react-native-svg";
import { format } from "@/src/helper/format";
import { useNavigation } from "expo-router";
import { Button } from "../Button";

import TrashSvg from "@/src/assets/svg/trash.svg";
import PhoneSvg from "@/src/assets/svg/phone.svg";

export interface JobCardProps {
  data?: Work;
  isLastChild?: boolean;
  isApplied?: boolean;
}

export const JobCard = ({ data, isLastChild, isApplied }: JobCardProps) => {
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
              backgroundColor: data?.skillType?.background,
            }}
            className="flex items-center justify-center w-14 h-14 rounded-lg"
          >
            {data?.skillType?.svgXml && (
              <SvgXml
                xml={data?.skillType.svgXml}
                width={24}
                height={24}
                fill={"#ffffff"}
              />
            )}
          </View>
          <View className="flex flex-col flex-1">
            <View className="ml-2 flex-1">
              <View className="flex justify-center flex-1">
                <Text className="text-[16px] font-semibold">{data?.title}</Text>
              </View>
              <View className="flex flex-row justify-between">
                <TouchableOpacity>
                  <Text className="text-xs">{data?.skillType?.name}</Text>
                </TouchableOpacity>
                <Text className="text-primary font-semibold">
                  {format().amount(data?.costPerHour || 0)}/hr
                </Text>
              </View>
            </View>
          </View>
        </View>
        {isApplied && (
          <View className="flex items-center justify-end flex-row mb-4 px-2 rounded-lg pt-2 bg-[#f8f8f8]">
            <Pressable className="flex-1 flex-row items-center">
              <TrashSvg height={15} width={15} fill={"rgb(220,38,38)"} />
              <Text className="ml-1 text-red-600 font-bold">Excluir</Text>
            </Pressable>
            <View className="mr-2">
              <Button
                className="my-0 bg-white max-h-[40px]"
                title="Chat"
                textClassName="text-primary"
              />
            </View>
            <View>
              <Button
                className="my-0 bg-white max-h-[40px]"
                title="Denunciar"
                textClassName="text-black"
                leftElement={
                  <View className="mr-1">
                    <PhoneSvg height={12} width={12} fill={"black"} />
                  </View>
                }
              />
            </View>
          </View>
        )}
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center w-[33.333333%]">
            <MapPinSvg height={14} fill={"rgb(107,114,128)"} />
            <Text
              style={{
                overflow: "hidden",
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-[10px] font-semibold text-gray-500"
            >
              {data?.address ? data?.address.name : "Não definido"}
            </Text>
          </View>
          <View className="flex flex-row items-center w-[33.333333%]">
            <JobSvg height={14} fill={"rgb(107,114,128)"} />
            <Text className="text-[10px] font-semibold text-gray-500">
              {format().time(data?.time)}
            </Text>
          </View>
          <View className="flex flex-row items-center ">
            <ClockSvg width={14} height={14} fill={"rgb(107,114,128)"} />
            <Text className="ml-2 text-[10px] font-semibold text-gray-500">
              {data?.totalTime}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
