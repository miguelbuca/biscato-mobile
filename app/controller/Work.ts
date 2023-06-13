import { format } from "@/src/helper/format";
import { SkillType, Work } from "@/src/interfaces";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const useWorkController = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const params: Work & { skillType?: SkillType } = useLocalSearchParams();

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

  return { params, scrollRef };
};
