import { View, Text, ScrollView } from "react-native";
import React from "react";
import { JobCard, PostCard } from "@/src/components";

const Applied = () => {
  const setoresTrabalhoInformal = [
    "Todas",
    "Vendas ambulantes",
    "Serviços domésticos",
    "Artesanato",
    "Reciclagem e coleta de resíduos",
    "Transporte informal",
    "Serviços de entrega",
    "Serviços de construção",
    "Cuidadores de animais de estimação",
    "Serviços de beleza",
  ];
  return (
    <ScrollView className="flex-1 flex flex-col gap-3 pt-5 bg-[#fafafa]">
      <View className="flex flex-col bg-white">
        <View className="p-4">
          <Text className="text-base font-semibold text-gray-500">
            Publicações
          </Text>
        </View>
        <ScrollView horizontal>
          <View className="flex flex-row py-4 px-2">
            {setoresTrabalhoInformal.map((name, index) => (
              <PostCard key={index} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="flex flex-col bg-white p-4 mb-8">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500">
            Minhas candidaturas
          </Text>
        </View>
        <View>
          {["", "", ""].map((_, index) => (
            <JobCard key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Applied;
