import React, { ReactNode, createContext, useContext, useState } from "react";
import { ViewProps, Modal, Text, View, Pressable } from "react-native";

export interface ToastProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  buttonText?: string;
  type?: "success" | "error" | undefined;
  closeAction?: () => void;
}

const ToastContext = createContext<{
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  toast?: (props: ToastProps) => void;
}>({});

export const ToastProvider: React.FC<ViewProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const [toastProps, setToastProps] = useState<ToastProps>({
    title: `Pedido Recusado !`,
    subtitle: `Preencha o Montante\n a Solicitar.`,
    type: "error",
  });

  return (
    <ToastContext.Provider
      value={{
        visible,
        setVisible,
        toast: (props: ToastProps) => {
          console.log(props);

          setToastProps(props);
          setVisible(true);
        },
      }}
    >
      {children}
      {toastProps && (
        <Modal transparent visible={visible}>
          <Pressable className="flex-1 bg-[rgba(0 0 0 0.5)] justify-center items-center ">
            <View className="bg-white p-4 rounded-lg">
              <Text>ola mundo</Text>
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
