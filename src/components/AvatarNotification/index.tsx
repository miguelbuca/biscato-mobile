import { View, Text } from "react-native";
import React, { FC } from "react";
import { Notification } from "@/src/interfaces";
import { AvatarNotificationController } from "./controller";
import { Image } from "react-native";
import normalize from "@/src/helper/normalize";
import { SvgXml } from "react-native-svg";

export const AvatarNotification: FC<{ data: Notification }> = ({ data }) => {
  const { img, isSVG } = AvatarNotificationController(data);

  return (
    <View key={data.id} className="flex items-center justify-center">
      {isSVG.value ? (
        <View className="flex items-center h-[45px] w-[45px] ">
          <SvgXml xml={img.value} />
        </View>
      ) : img.value ? (
        <View className="flex items-center justify-center rounded-full border-2 h-[45px] w-[45px] border-slate-100">
          <Image
            style={{
              height: normalize(45),
              width: normalize(45),
              borderRadius: 50,
            }}
            source={{
              uri: img.value,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};
