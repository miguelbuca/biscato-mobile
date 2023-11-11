import { View, Text } from "react-native";
import React from "react";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { useSelectController } from "./controller";

export interface SelectInputProps extends PickerSelectProps {
  errorMessage?: string;
  leftElement?: JSX.Element;
  placeholder?:string
}
export const Select = ({
  leftElement,
  errorMessage,
  placeholder,
  ...args
}: SelectInputProps) => {
  const { colorScheme } = useSelectController();
  return (
    <>
      <View className="bg-[#f8f8f8] dark:bg-[#222] dark:border-[#222] my-2 flex flex-row items-center border border-transparent rounded-lg focus:border focus:rounded-lg focus:border-primary">
        {leftElement ? <View className="ml-2">{leftElement}</View> : null}
        <View className="flex-1">
          <RNPickerSelect
            doneText="Fechar"
            placeholder={{
              label: placeholder || "Nenhum",
              value: undefined,
            }}
            style={{
              inputIOS: {
                width: "100%",
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                backgroundColor: "transparent",
                color: colorScheme === "dark" ? "#fff" : "#000",
                paddingRight: 30,
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                backgroundColor: "transparent",
                color: colorScheme === "dark" ? "#fff" : "#000",
                paddingRight: 30,
              },
            }}
            darkTheme={colorScheme === "dark"}
            {...args}
          />
        </View>
      </View>
      {errorMessage && (
        <Text className="text-red-600 text-[10px]">{errorMessage}</Text>
      )}
    </>
  );
};
