import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";

import MapPinSvg from "@/src/assets/svg/map-pin.svg";
import JobSvg from "@/src/assets/svg/job.svg";
import ClockSvg from "@/src/assets/svg/clock.svg";
import { Work } from "@/src/interfaces";
import { SvgXml } from "react-native-svg";
import { format } from "@/src/helper/format";
import { Button } from "../Button";

import TrashSvg from "@/src/assets/svg/trash.svg";
import PhoneSvg from "@/src/assets/svg/phone.svg";
import { useJobCardController } from "./controller";

export interface JobCardProps {
  data?: Work;
  isLastChild?: boolean;
  isApplied?: boolean;
}

export const JobCard = ({ data, isLastChild, isApplied }: JobCardProps) => {
  const { handlerRemoveApplication, navigate, colorScheme } =
    useJobCardController(data?.id);

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
          !isLastChild && "border-b border-[#f8f8f8] dark:border-b-[#222]"
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
                fill={colorScheme === "light" ? "#fff" : "#000"}
              />
            )}
          </View>
          <View className="flex flex-col flex-1">
            <View className="ml-2 flex-1">
              <View className="flex justify-center flex-1">
                <Text className="text-[16px] font-semibold dark:text-white">
                  {data?.title}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <TouchableOpacity>
                  <Text className="text-xs dark:text-white">
                    {data?.skillType?.name}
                  </Text>
                </TouchableOpacity>
                <Text className="text-primary font-semibold">
                  {format().amount(data?.costPerHour || 0)}/hr
                </Text>
              </View>
            </View>
          </View>
        </View>
        {isApplied && (
          <View className="flex items-center justify-end flex-row mb-4 px-2 rounded-lg pt-2 bg-[#f8f8f8] dark:bg-[#222]">
            <Pressable
              onPress={handlerRemoveApplication}
              className="flex-1 flex-row items-center"
            >
              <TrashSvg height={15} width={15} fill={"rgb(220,38,38)"} />
              <Text className="ml-1 text-red-600 font-bold">Excluir</Text>
            </Pressable>
            <View className="mr-2">
              <Button
                className="my-0 bg-white max-h-[40px] dark:bg-[#111]"
                title="Chat"
                textClassName="text-primary dark:text-white"
                onPress={() => {
                  navigate("Chat", {
                    toAccount: data?.user?.id,
                  });
                }}
              />
            </View>
            <View>
              <Button
                className="my-0 bg-white max-h-[40px] dark:bg-black"
                title="Denunciar"
                textClassName="text-black dark:text-white"
                leftElement={
                  <View className="mr-1">
                    <PhoneSvg
                      height={12}
                      width={12}
                      fill={colorScheme === "dark" ? "#fff" : "#000"}
                    />
                  </View>
                }
              />
            </View>
          </View>
        )}
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center min-w-[33.333333%] w-[33.333333%] max-w-[33.333333%]">
            <MapPinSvg height={14} fill={"rgb(107,114,128)"} />
            <Text
              style={{
                overflow: "hidden",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-[10px] font-semibold text-gray-500"
            >
              {data?.address ? data?.address.name : "Não definido"}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center min-w-[33.333333%] w-[33.333333%] max-w-[33.333333%]">
            <JobSvg height={14} fill={"rgb(107,114,128)"} />
            <Text className="text-[10px] font-semibold text-gray-500">
              {format().time(data?.time)}({data?.totalTime})
            </Text>
          </View>
          <View className="flex flex-row items-center justify-end min-w-[33.333333%] w-[33.333333%] max-w-[33.333333%] ">
            <ClockSvg width={14} height={14} fill={"rgb(107,114,128)"} />
            <Text className="ml-2 text-[10px] font-semibold text-gray-500">
              {format().checkDate(data?.createdAt as string, true)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
