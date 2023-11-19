import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewProps,
  Pressable,
} from "react-native";
import React, { FC } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";

import PhoneInput from "react-native-phone-input";
import { useInputController } from "./constroller";

import RNDateTimePicker, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";

import { theme } from "@/tailwind.config";
import { useBetterState } from "@/src/hooks/useBetterState";
import { useColorScheme } from "nativewind";

export interface InputProps extends TextInputProps {
  errorMessage?: string;
  leftElement?: JSX.Element;
  currencyProps?: CurrencyInputProps;
  isPhone?: boolean;
}
export const Input = ({
  leftElement,
  currencyProps,
  errorMessage,
  isPhone,
  ...args
}: InputProps) => {
  const { phoneInputRef } = useInputController();
  return (
    <>
      <View className="bg-[#f8f8f8] dark:bg-[#222] dark:border-[#222] my-2 flex flex-row items-center border border-transparent rounded-lg focus:border focus:rounded-lg focus:border-primary">
        {leftElement ? <View className="ml-2">{leftElement}</View> : null}
        {!currencyProps && !isPhone ? (
          <TextInput
            placeholderTextColor={"#aeaeae"}
            className="h-12 px-4 w-full rounded-lg dark:text-white"
            {...args}
          />
        ) : currencyProps ? (
          <CurrencyInput
            className="h-12 px-4 w-full rounded-lg dark:text-white"
            {...(args as any)}
            {...(currencyProps as any)}
          />
        ) : (
          <PhoneInput
            initialCountry="ao"
            className="h-12 px-2 w-full rounded-lg dark:text-white"
            autoFormat
            ref={phoneInputRef as any}
            onChangePhoneNumber={(value) => {
              if (!value) return;
              args?.onChangeText?.(value?.split(" ").join(""));
            }}
            {...args}
          />
        )}
      </View>
      {errorMessage && (
        <Text className="text-red-600 text-[10px]">{errorMessage}</Text>
      )}
    </>
  );
};

export const InputDataPicker = ({
  label,
  leftElement,
  errorMessage,
  onChange,
  value,
  ...args
}: Omit<DateTimePickerProps, "onConfirm" | "onCancel"> & {
  label?: string;
  value?: Date;
} & Pick<InputProps, "leftElement" | "errorMessage">) => {
  const isDatePickerVisible = useBetterState<boolean>(false);
  const { colorScheme } = useColorScheme()

  const showDatePicker = () => {
    isDatePickerVisible.value = true;
  };

  const hideDatePicker = () => {
    isDatePickerVisible.value = false;
  };

  const handleConfirm = (date: Date) => {
    onChange?.(date);
    hideDatePicker();
  };

  return (
    <View className="my-2">
      <Pressable
        onPress={showDatePicker}
        className="bg-[#f8f8f8] rounded-lg  h-12 px-2 flex-row  items-center"
      >
        {leftElement ? <View className="mr-2">{leftElement}</View> : null}
        {label || value ? (
          <View className="flex-1 mr-2">
            <Text className="text-[#aeaeae] text-[16px]">
              {value?.toLocaleDateString() || label}
            </Text>
          </View>
        ) : null}
        <RNDateTimePicker
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          collapsable={false}
          {...args}
          themeVariant={colorScheme}
          isVisible={isDatePickerVisible.value}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Pressable>
      {errorMessage && (
        <Text className="text-red-600 text-[10px] mt-2">{errorMessage}</Text>
      )}
    </View>
  );
};
