import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSkillController } from "./controller/Skill";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

const Skill = () => {
  const {
    skillType,
    handlerSelectSkill,
    selectedSkills,
    colorScheme,
    handlerSaveUserSkills,
    maxNumberOfSkills,
  } = useSkillController();
  return (
    <View className="flex-1 dark:bg-black">
      <ScrollView className="pt-16 px-4">
        <View className="my-8">
          <Text className="dark:text-white">
            Vamos descobrir as suas habilidades juntos!
          </Text>
          <Text className="text-3xl my-2 dark:text-white">
            Quais delas você gostaria de destacar? 😊
          </Text>
        </View>
        <View className="flex flex-row flex-wrap gap-y-3 gap-x-2 mt-4">
          {skillType.value.map((item, key) => {
            return (
              <Pressable
                onPress={() => handlerSelectSkill(item.id as number)}
                className={`p-3 border rounded-full border-primary ${
                  selectedSkills.value.includes(item.id as number)
                    ? "bg-primary"
                    : selectedSkills.value.length === maxNumberOfSkills
                    ? "border-[#ccc]"
                    : "bg-transparent"
                }`}
                key={key}
              >
                <Text
                  className={`text-primary font-medium ${
                    selectedSkills.value.includes(item.id as number)
                      ? "text-white"
                      : selectedSkills.value.length === maxNumberOfSkills
                      ? "text-[#ccc]"
                      : "bg-transparent"
                  }`}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <BlurView
        intensity={80}
        tint={colorScheme}
        style={{
          borderTopWidth: 0.2,
          borderTopColor:
            colorScheme === "light" ? "#cccccc" : "rgba(255,255,255,0.1)",
        }}
        className="flex flex-row px-4 min-h-[100px] items-center pb-4"
      >
        <View className="flex-1">
          {
            <Text className="dark:text-white">
              {maxNumberOfSkills - selectedSkills.value.length > 0
                ? "Restou "
                : "Esgotado "}
              ({maxNumberOfSkills - selectedSkills.value.length})
            </Text>
          }
        </View>
        <Pressable onPress={handlerSaveUserSkills}>
          <Text className="font-bold text-primary">Iniciar agora</Text>
        </Pressable>
      </BlurView>
      <StatusBar style={colorScheme !== "light" ? "light" : "dark"} />
    </View>
  );
};

export default Skill;
