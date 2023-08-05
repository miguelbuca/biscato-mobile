import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
import { JobCard, PostCard } from "@/src/components";
import { useAppliedController } from "./controller/Applied";

const Applied = () => {
  const { works, applications, refreshing, load } = useAppliedController();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing.value} onRefresh={load} />
      }
      className="flex-1 flex flex-col gap-3 pt-5 bg-[#fafafa]"
    >
      <View className="flex flex-col bg-white">
        <View className="p-4">
          <Text className="text-base font-semibold text-gray-500">
            Publicações ({works.state.value.length})
          </Text>
        </View>
        {works.state.value.length > 0 && (
          <ScrollView horizontal>
            <View className="flex flex-row py-4 px-2">
              {works.state.value.map((item, index) => (
                <PostCard key={index} data={item} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      <View className="flex flex-col bg-white p-4 mb-8">
        <View>
          <Text className="text-base font-semibold text-gray-500">
            Minhas candidaturas
          </Text>
        </View>
        <View className="mb-t">
          {applications.state.value.map((item, index, arr) => (
            <JobCard
              key={index}
              data={item.work}
              isLastChild={index + 1 === arr.length}
              isApplied
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Applied;
