import { View, Text, ViewProps, StyleProp, TextStyle } from "react-native";
import React from "react";

export interface AvatarProps extends ViewProps {
  letters: string;
  image?: string;
  fontStyles?: StyleProp<TextStyle>;
}

export const Avatar = ({
  image,
  fontStyles,
  letters,
  ...args
}: AvatarProps) => {
  return (
    <View
      style={{
        borderColor: "rgba(0,0,0,0.1)",
      }}
      className="bg-white h-16 w-16  border-4 rounded-full items-center justify-center"
      {...args}
    >
      {!image ? (
        <Text style={fontStyles} className="text-xl font-bold">
          {letters}
        </Text>
      ) : (
        <Text>image</Text>
      )}
    </View>
  );
};
