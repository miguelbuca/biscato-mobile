import React, { ReactNode, createContext, useContext, useState } from "react";
import {
  ViewProps,
  Modal,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";

import CorrectSvg from "@/src/assets/svg/correct.svg";
import TimesSvg from "@/src/assets/svg/times.svg";
import WarnSvg from "@/src/assets/svg/warn.svg";
import InfoSvg from "@/src/assets/svg/info.svg";
import { useColorScheme } from "nativewind";

type toastType = "success" | "error" | "warn" | "info";

export interface ToastProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  buttonText?: string;
  type?: toastType;
  closeAction?: () => void;
}

const ToastContext = createContext<{
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  toast?: (props: ToastProps) => void;
}>({});

export const ToastProvider: React.FC<ViewProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const [toastProps, setToastProps] = useState<ToastProps>();
  const { colorScheme } = useColorScheme()

  const iconType: {
    [property in toastType]?: ReactNode;
  } = {
    success: (
      <View className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
        <CorrectSvg width={22} height={22} fill={"#fff"} />
      </View>
    ),
    error: (
      <View className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center">
        <TimesSvg width={22} height={22} fill={"#fff"} />
      </View>
    ),
    warn: (
      <View className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center">
        <WarnSvg width={25} height={25} fill={"#fff"} />
      </View>
    ),
    info: (
      <View className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
        <InfoSvg width={25} height={25} fill={"#fff"} />
      </View>
    ),
  };

  return (
    <ToastContext.Provider
      value={{
        visible,
        setVisible,
        toast: (props: ToastProps) => {
          setToastProps(props);
          setVisible(true);
        },
      }}
    >
      {children}
      {toastProps && (
        <Modal
          transparent
          animationType="fade"
          onDismiss={toastProps.closeAction}
          visible={visible}
        >
          <Pressable
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
            }}
            className="flex-1 justify-center items-center py-4"
          >
            <View className="flex flex-col items-center justify-center bg-white dark:bg-[#111] p-4 rounded-[24px] w-[80%] max-w-[]">
              <View className="flex flex-col">
                <View className="self-center my-2">
                  {toastProps.icon
                    ? toastProps.icon
                    : iconType[toastProps.type || "info"]}
                </View>
                <View className="min-w-full border-b border-b-[#eee] dark:border-b-[#222] my-2 pb-2 flex items-center justify-center">
                  <Text className="font-semibold dark:text-white">
                    {toastProps.title}
                  </Text>
                </View>
              </View>
              <View className="py-4">
                <Text className="dark:text-white opacity-50">
                  {toastProps.subtitle}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                }}
                onPress={() => {
                  toastProps.closeAction
                    ? toastProps.closeAction()
                    : setVisible(false);
                }}
              >
                <View className="w-full items-center justify-center bg-black dark:bg-[#222] p-3 py-4 rounded-[24px]">
                  <Text className="text-white font-semibold">
                    {toastProps.buttonText
                      ? toastProps.buttonText
                      : "Tentar novamente"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }

  return context;
}
