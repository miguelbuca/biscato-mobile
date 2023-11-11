import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType, User, Work } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

export const useWorkController = () => {
  const navigation = useNavigation();
  const user: User = useSelector(AuthSelectors)?.user;
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const params: Work & { skillType?: SkillType } = useLocalSearchParams();
  const isMyWork = useBetterState<boolean>(false);
  const { colorScheme } = useColorScheme();

  const handlerCreateApplication = useCallback(async () => {
    try {
      if (!params?.id || params.user?.id === user.id) return;

      await Api.application.create({
        workId: params.id,
      });
    } catch (error) {
      console.log({ error });
    }
  }, [params, user]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.skillType?.name,
      headerTitleStyle: {
        color: colorScheme === "dark" ? "#000" : "#fff",
      },
      headerTintColor: colorScheme === "dark" ? "#000" : "#fff",
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: params.skillType?.background,
      },
    });
  }, [colorScheme]);

  useEffect(() => {
    isMyWork.value = user.id === params.user?.id;
  }, [params, user]);

  return { params, scrollRef, handlerCreateApplication, isMyWork, colorScheme };
};
