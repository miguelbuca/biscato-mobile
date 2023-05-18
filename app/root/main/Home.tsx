import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { JobCard } from "@/src/components";

import FilterSvg from "@/src/assets/svg/filter.svg";
import MegaphoneSvg from "@/src/assets/svg/megaphone.svg";

const Home = () => {
  /**
   * Somente as marcadas em pesquisa
   */
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
      <ScrollView className="bg-white" horizontal>
        <View className="flex flex-row p-4">
          <View className="flex items-center justify-center border border-[#f8f8f8] rounded-lg p-2">
            <FilterSvg height={20} fill={"rgb(107,114,128)"} />
          </View>
          {setoresTrabalhoInformal.map((name, index) => (
            <View
              className={`flex items-center justify-center mx-2 py-3 px-4 rounded-lg ${
                index === 0 ? `bg-primary` : `bg-[#f8f8f8]`
              }`}
              key={index}
            >
              <Text className={` font-[500] ${index === 0 && `text-white`}`}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex flex-row items-center p-4 bg-white">
        <View className="flex-1">
          <Text className="text-[16px]">Queres um biscateiro?</Text>
        </View>
        <View>
          <TouchableOpacity>
            <View className="flex flex-row items-center justify-center rounded-full bg-black  px-5 h-[42px]">
              <View className="mr-3">
                <MegaphoneSvg width={16} fill={"#ffffff"} />
              </View>
              <Text className="font-bold text-xs text-white">Publicar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-col bg-white p-4 mb-8">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-500">
            Sugestões de trabalho
          </Text>
        </View>
        <View>
          {["", "", "", ""].map((_, index) => (
            <JobCard key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
