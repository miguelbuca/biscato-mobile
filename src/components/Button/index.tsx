import {
  View,
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  leftElement?: JSX.Element;
  className?: string;
  textClassName?: string;
}
export const Button = ({
  leftElement,
  children,
  style,
  className,
  textClassName,
  title,
  ...args
}: ButtonProps) => {
  return (
    <>
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}
        {...args}
      >
        <View
          className={`flex justify-center bg-primary my-2 flex-row items-center h-12 px-4 w-fit rounded-lg ${className}`}
          style={style}
        >
          {leftElement}
          {title && (
            <Text className={`font-semibold text-white ${textClassName}`}>
              {title}
            </Text>
          )}
          {children}
        </View>
      </TouchableOpacity>
    </>
  );
};
