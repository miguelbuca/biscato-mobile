import { View, Text } from "react-native";
import React from "react";
import { Button } from "../Button";

import GoogleSvg from "@/src/assets/svg/google.svg";
import AppleSvg from "@/src/assets/svg/appple.svg";

export const OAuthButtons = () => {
  return (
    <View className="flex flex-row items-center gap-5 justify-center px-4 mb-4">
      <Button
        leftElement={
          <View className="mr-2">
            <AppleSvg fill={"#ffffff"} />
          </View>
        }
        title="Apple"
        className="bg-black"
      />
      <Button
        leftElement={
          <View className="mr-2">
            <GoogleSvg />
          </View>
        }
        title="Google"
        className="bg-white"
        textClassName="text-blue-500"
      />
    </View>
  );
};
