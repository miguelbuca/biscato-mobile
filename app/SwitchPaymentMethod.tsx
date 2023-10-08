import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { SwitchPaymentMethoController } from "./controller/SwitchPaymentMethod";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/src/components";

const SwitchPaymentMethod = () => {
  const { methods, selectedType } = SwitchPaymentMethoController();
  return (
    <View className="flex-1 flex-col">
      <FlatList
        className="flex-1 p-4 flex-col"
        data={methods}
        renderItem={({ item: { name, type, description, onPress }, index }) => {
          return (
            <Pressable
              className={`flex flex-row bg-white p-4  ${
                index === 0 ? "rounded-tl-lg rounded-tr-lg mt-4" : ""
              }  ${
                methods.length === index + 1
                  ? "rounded-bl-lg rounded-br-lg mb-4"
                  : "border-b border-b-slate-100"
              }`}
              key={index}
              onPress={onPress}
            >
              <View className="flex items-center">
                <View className="flex items-center justify-center h-4 w-4 rounded-full p-2 border-primary border-2 border-solid">
                  {selectedType.value === type && (
                    <View className="h-2 w-2 bg-primary rounded-full" />
                  )}
                </View>
              </View>
              <View className="px-4">
                <Text>{name}</Text>
                <Text className="text-xs opacity-50 mt-2">{description}</Text>
              </View>
            </Pressable>
          );
        }}
      />
      <SafeAreaView>
        <View className="px-4">
          <Button title="Prosseguir" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SwitchPaymentMethod;
