import {
  View,
  Text,
  ImageBackgroundProps,
  ImageBackground,
} from "react-native";
import React from "react";

export const SplashScreen = ({
  ...args
}: Omit<ImageBackgroundProps, "source">) => {
  return (
    <ImageBackground
      source={require("@/src/assets/splash.png")}
      style={{
        flex: 1,
      }}
      {...args}
    />
  );
};
