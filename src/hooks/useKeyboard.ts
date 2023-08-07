import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";
import { useBetterState } from "./useBetterState";

export const useKeyboard = () => {
  const keyboardHeight = useBetterState(0);
  const displayFrame = useBetterState(false);

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      // Remove type here if not using TypeScript
      keyboardHeight.value = e.endCoordinates.height;
    }

    function onKeyboardDidHide() {
      keyboardHeight.value = 0;
    }

    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { keyboardHeight, displayFrame };
};
