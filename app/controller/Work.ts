import { Api } from "@/src/api";
import { SkillType, User, Work } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

export const useWorkController = () => {
  const navigation = useNavigation();
  const user: User = useSelector(AuthSelectors)?.user;
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const params: Work & { skillType?: SkillType } = useLocalSearchParams();

  const handlerCreateApplication = useCallback(async () => {
    try {
      if (!params?.id || params.user?.id === user.id) return;

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
