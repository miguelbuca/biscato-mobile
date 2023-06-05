import {
  View,
  Text,
  TouchableOpacity,
  TextInputProps,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useBetterState } from "@/src/hooks/useBetterState";
const { height } = Dimensions.get("screen");
export interface SelectInputProps extends Omit<TextInputProps, "onChange"> {
  errorMessage?: string;
  onChange: (value: any) => void;
  selectedId?: string | number;
  leftElement?: JSX.Element;
  data: any[];
  /**
   * ``position: 0`` as id field
   * ``position: 1`` as value field
   */
  fields?: string[];
  keyAsNumber?: boolean;
  getSelectedLabel?: (title: string) => void;
}
export const Select = ({
  leftElement,
  onChange,
  getSelectedLabel,
  errorMessage,
  selectedId,
  fields = ["id", "value"],
  data,
  value,
  keyAsNumber = true,
  ...args
}: SelectInputProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const _value = useMemo(() => {
    const vl =
      value &&
      data.find((item) => {
        if (!keyAsNumber) {
          return item?.[fields?.[0]] === value;
        } else return item?.[fields?.[0]] === parseInt(value);
      })?.[fields?.[1]];

    return vl;
  }, [data, value, fields]);

  useEffect(() => {
    getSelectedLabel?.(value ? _value : value);
  }, [value, _value]);

  return (
    <TouchableOpacity onPress={onOpen}>
      <View className="bg-[#f8f8f8] my-2 flex flex-row items-center border border-transparent rounded-lg focus:border focus:rounded-lg focus:border-primary">
        {leftElement ? <View className="ml-2">{leftElement}</View> : null}
        <TextInput
          placeholderTextColor={"#aeaeae"}
          className="h-12 px-4 w-full rounded-lg -z-10"
          editable={false}
          onPressIn={onOpen}
          value={value ? _value : value}
          {...args}
        />
        <Modalize
          ref={modalizeRef}
          HeaderComponent={
            <View className="mx-6 border-b py-4 border-b-[#f8f8f8]">
              <Text className="font-semibold text-base">
                {args.placeholder}
              </Text>
            </View>
          }
          flatListProps={{
            data,
            renderItem: ({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onChange?.(item);
                    modalizeRef.current?.close();
                  }}
                  key={index}
                >
                  <View
                    className={`relative flex-row text px-6 py-4 ${
                      index % 2 != 0 ? `bg-[#f8f8f8]` : ``
                    }`}
                  >
                    <View className="flex-1">
                      <Text className="flex-1text-md">
                        {item?.[fields?.[1]]}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            },
          }}
          withReactModal
          modalHeight={height / 2}
        />
      </View>
      {errorMessage && (
        <Text className="text-red-600 text-[10px]">{errorMessage}</Text>
      )}
    </TouchableOpacity>
  );
};
