import { View, Text, Pressable, ViewProps } from "react-native";
import React from "react";
import { useAccordionController } from "./controller";

import ArrowDownSvg from "@/src/assets/svg/form/arrow-down.svg";
import ArrowUpSvg from "@/src/assets/svg/form/arrow-up.svg";

export interface AccordinProps extends Omit<ViewProps, "className"> {
  title: string;
  isOpen?: boolean;
}

export const Accordion = ({
  title,
  children,
  isOpen,
  ...args
}: AccordinProps) => {
  const { display } = useAccordionController(isOpen || false);
  return (
    <View className="flex flex-col bg-white" {...args}>
      <Pressable
        onPress={() => (display.value = !display.value)}
        className="flex flex-row justify-between p-4 px-6"
      >
        <Text className="text-base font-semibold text-gray-500 my-2">
          {title}
        </Text>
        <View className="flex justify-center items-center">
          {!display.value ? (
            <ArrowDownSvg
              height={18}
              width={18}
              fill={"rgba(107,114,128,0.5)"}
            />
          ) : (
            <ArrowUpSvg height={18} width={18} fill={"rgba(107,114,128,0.5)"} />
          )}
        </View>
      </Pressable>
      {display.value && <View className="p-4 px-6 pt-0">{children}</View>}
    </View>
  );
};
