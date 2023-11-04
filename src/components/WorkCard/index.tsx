import { FC } from "react";
import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { useWorkCardController } from "./constroller";
import { PortfolioItem } from "@/src/interfaces";
import { ViewStyle } from "react-native";

export const WorkCard: FC<{ item: PortfolioItem; style?: ViewStyle }> = ({ item, style }) => {
  const { randomBool } = useWorkCardController();

  return (
    <View
      className=""
      key={item.id}
      style={[{ paddingTop: 12, flex: 1 }, style]}
    >
      <View className="ml-[12px] bg-white p-0.5 rounded-xl dark:bg-[#222]">
        <Image
          source={{ uri: item.image }}
          style={{
            height: 250,
            alignSelf: "stretch",
          }}
          resizeMode="stretch"
          className="rounded-xl"
        />
        <Text
          className="py-4 px-2 dark:text-white"
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};
