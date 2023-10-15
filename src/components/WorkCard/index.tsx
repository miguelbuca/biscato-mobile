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
      <View className="ml-[12px] bg-white p-0.5 rounded-2xl">
        <Image
          source={{ uri: item.image }}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: "stretch",
          }}
          resizeMode="cover"
          className="rounded-2xl"
        />
        <Text
          className="py-4 px-2"
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};
