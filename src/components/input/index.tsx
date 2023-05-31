import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
export interface InputProps extends TextInputProps {
  errorMessage?: string;
  leftElement?: JSX.Element;
}
export const Input = ({ leftElement, errorMessage, ...args }: InputProps) => {
  return (
    <>
      <View className="bg-[#f8f8f8] my-2 flex flex-row items-center border border-transparent focus:border focus:rounded-lg focus:border-primary">
        {leftElement ? <View className="ml-2">{leftElement}</View> : null}
        <TextInput
          placeholderTextColor={"#aeaeae"}
          className="h-12 px-4 w-full rounded-lg"
          {...args}
        />
      </View>
      {errorMessage && (
        <Text className="text-red-600 text-[10px]">{errorMessage}</Text>
      )}
    </>
  );
};
