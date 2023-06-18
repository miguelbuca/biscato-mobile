import { Api } from "@/src/api";
import { SkillType, Work } from "@/src/interfaces";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const useWorkController = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const params: Work & { skillType?: SkillType } = useLocalSearchParams();

  const handlerCreateApplication = useCallback(async () => {
    try {
      if (!params.id) return;
      const { data } = await Api.application.create({
        workId: params.id,
      });
    } catch (error) {
      console.log({ error });
    }
  }, [params]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.skillType?.name,
      headerTitleStyle: {
        color: "#ffffff",
      },
      headerTintColor: "#ffffff",
      headerShadowVisible: false,
      headerBackTitleStyle: {
        color: "#ffffff",
      },
      headerStyle: {
        backgroundColor: params.skillType?.background,
      },
    });
  }, []);

  return { params, scrollRef, handlerCreateApplication };
};
