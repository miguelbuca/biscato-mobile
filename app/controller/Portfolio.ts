import { Api, baseURL } from "@/src/api";
import normalize from "@/src/helper/normalize";
import { useBetterState } from "@/src/hooks/useBetterState";
import { User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import {
  rect,
  rrect,
  useComputedValue,
  useImage,
} from "@shopify/react-native-skia";
import { useSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

export const usePortfolioController = () => {
  const { userId } = useSearchParams<{ userId: string }>();
  const { width } = useWindowDimensions();
  const logged: User = useSelector(AuthSelectors).user;
  const user = useBetterState<User | undefined>(undefined);
  const isMyPortfolio = useBetterState<boolean>(false);

  const loadUserInfo = useCallback(async () => {
    if (!userId) return;
    const { data } = await Api.user.findUser(userId);
    user.value = data;
    isMyPortfolio.value = data.id === logged.id;
  }, [userId]);

  useEffect(() => {
    try {
      loadUserInfo();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const img = useImage(
    `${baseURL}/${user.value?.persons?.[0]?.avatar?.split("\\").join("/")}`
  );
  
  return {
    logged,
    isMyPortfolio,
    user,
  };
};
