import { View, Text } from "react-native";
import React from "react";
import { Chat } from "@/src/interfaces";
import { Avatar } from "../Avatar";
import normalize from "@/src/helper/normalize";
import * as Constants from "expo-constants";
import { format } from "@/src/helper/format";

export interface MessageCardProps {
  data: Chat;
  isSender?: boolean;
}
const MessageCard = ({ isSender, data }: MessageCardProps) => {
  return (
    <View
      style={{
        alignSelf: isSender ? "flex-end" : "flex-start",
        flexDirection: 'column',
      }}
    >
      <View
        style={
          isSender
            ? {
                borderBottomRightRadius: 0,
              }
            : {
                borderTopLeftRadius: 0,
              }
        }
        className={`flex flex-col ${
          isSender ? "bg-green-500" : "bg-[#f3f3f3]"
        } my-1 p-2 rounded-2xl`}
      >
        <View>
          <Text className={`${isSender ? "text-white" : "text-black"} text-xs`}>
            {data.content}
          </Text>
        </View>
      </View>
      {/*<View
        style={{
          marginLeft: isSender ? normalize(8) : 0,
          marginRight: !isSender ? normalize(8) : 0,
        }}
      >
        <Avatar
          image={`${Constants.default.expoConfig?.extra?.api}/${
            isSender
              ? data.sender?.persons?.[0].avatar
              : data.sender?.persons?.[0].avatar
          }`}
          imageStyle={{
            height: normalize(35),
            width: normalize(35),
          }}
          className="flex items-center h-[40px] w-[40px]"
        />
      </View>*/}
    </View>
  );
};

export default MessageCard;
