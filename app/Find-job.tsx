import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { FindJobCard } from "@/src/components";
import { SvgXml } from "react-native-svg";
import { useFindJobController } from "./root/controller";

const FindJob = () => {
  const { skilltypes, userSkilltypesIds } = useFindJobController();

  return (
    <View className="h-full bg-white">
      <FlatList
        data={skilltypes.value}
        numColumns={2}
        className="py-12 px-4"
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="flex w-[50%] items-center justify-center"
          >
            <FindJobCard
              isChecked={userSkilltypesIds.value.includes(item.id)}
              image={
                <SvgXml
                  height={40}
                  width={40}
                  fill={"#2e2e2e"}
                  xml={`${item.svgXml}`}
                />
              }
              name={item?.name}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-col min-h-[150px]">
            <View className="flex items-center justify-center p-4 my-8 ">
              <Text className="text-center text-2xl max-w-[300px]">
                Que tipo de{" "}
                <Text className="text-primary font-bold">Trabalho</Text> você
                está <Text className="font-bold">procurando?</Text>
              </Text>
            </View>
            <View className="mb-8">
              <TextInput
                placeholder="Escreva o nome..."
                placeholderTextColor={`#cccccc`}
                className="border border-[#cccccc] rounded-full py-4 px-8 bg-[#fcfcfc]"
              />
            </View>
          </View>
        )}
        ListFooterComponent={() => <View className="h-[200px]" />}
      />
      <View className="absolute self-center mb-8 bottom-0 flex items-center justify-center p-4">
        <TouchableOpacity>
          <View className="flex items-center justify-center rounded-full bg-black py-4 px-8 h-[55px]">
            <Text className="font-bold text-white">Encontrar trabalhos</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindJob;
