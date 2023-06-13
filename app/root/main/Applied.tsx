import { View, Text, ScrollView } from "react-native";
import React from "react";
import { JobCard, PostCard } from "@/src/components";
import { useAppliedController } from "./controller/Applied";

const Applied = () => {
  const { works } = useAppliedController();

  return (
    <ScrollView className="flex-1 flex flex-col gap-3 pt-5 bg-[#fafafa]">
      <View className="flex flex-col bg-white">
        <View className="p-4">
          <Text className="text-base font-semibold text-gray-500">
            Publicações ({works.state.value.length})
          </Text>
        </View>
        <ScrollView className="flex flex-row py-4 px-2" horizontal>
          {works.state.value.map((item, index) => (
            <PostCard key={index} data={item} />
          ))}
        </ScrollView>
      </View>

      <View className="flex flex-col bg-white p-4 mb-8">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500">
            Minhas candidaturas
          </Text>
        </View>
        <View>
          {/*["", "", ""].map((_, index) => (
            <JobCard key={index} />
          ))*/}
        </View>
      </View>
    </ScrollView>
  );
};

export default Applied;
