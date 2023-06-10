import { format } from "@/src/helper/format";
import { SkillType, Work } from "@/src/interfaces";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";

export const useWorkController = () => {
  const navigation = useNavigation();
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

  return { params };
};
