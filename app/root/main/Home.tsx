import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Pressable,
} from "react-native";
import React from "react";
import { JobCard } from "@/src/components";

import FilterSvg from "@/src/assets/svg/filter.svg";
import MegaphoneSvg from "@/src/assets/svg/megaphone.svg";
import { useHomeController } from "./controller";
import { Link } from "expo-router";

const Home = () => {
  const { userSkills, works, refreshing, load, filter, handlerSkillType } =
    useHomeController();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing.value} onRefresh={load} />
      }
      className="flex-1 flex flex-col gap-3 pt-5 bg-[#fafafa]"
    >
      <ScrollView
        className="bg-white"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-row p-4">
          <View className="flex items-center justify-center border border-[#f8f8f8] rounded-lg p-2">
            <FilterSvg height={20} fill={"rgb(107,114,128)"} />
          </View>
          <Pressable
            className={`flex items-center justify-center ml-2 py-3 px-4 rounded-lg 
            ${filter.job?.skillType === "" ? "bg-primary" : "bg-[#f8f8f8]"}
            `}
            onPress={() => handlerSkillType("")}
          >
            <Text
              className={`font-[500] ${
                filter.job?.skillType === "" && "text-white"
              }`}
            >
              Todos
            </Text>
          </Pressable>
          {userSkills.value.map(({ name, skillType }, index) => (
            <Pressable
              onPress={() => handlerSkillType(skillType?.name || "")}
              className={`flex items-center justify-center mx-2 py-3 px-4 rounded-lg ${
                filter.job?.skillType === skillType?.name
                  ? "bg-primary"
                  : "bg-[#f8f8f8]"
              } `}
              key={index}
            >
              <Text
                className={` font-[500] ${
                  filter.job?.skillType === skillType?.name && "text-white"
                }`}
              >
                {skillType?.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="flex flex-row items-center p-4 bg-white">
        <View className="flex-1">
          <Text className="text-[16px]">Queres um biscateiro?</Text>
        </View>
        <View>
          <Link href={"/Publication"}>
            <View className="flex flex-row items-center justify-center rounded-full bg-black  px-5 h-[42px]">
              <View className="mr-3">
                <MegaphoneSvg width={16} fill={"#ffffff"} />
              </View>

              <Text className="font-bold text-xs text-white">Publicar</Text>
            </View>
          </Link>
        </View>
      </View>

      <View className="flex flex-col bg-white p-4 mb-8">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500">
            Sugestões de trabalho
          </Text>
        </View>
        <View>
          {works.value.map((item, index, arr) => (
            <JobCard
              key={index}
              data={item}
              isLastChild={index + 1 === arr.length}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
