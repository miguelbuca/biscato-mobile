import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType } from "@/src/interfaces";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";

export const usePublicationController = () => {
  const { navigate }: any = useNavigation();
  const skillTypes = useBetterState<SkillType[]>([]);
  const selectedTime = useBetterState<string>("");

  const loadSkillType = useCallback(async () => {
    try {
      const { data } = await Api.skillType.all();
      skillTypes.value = data;
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const laod = () => {
    loadSkillType();
  };

  useEffect(laod, []);

  return {
    navigate,
    skillTypes,
    selectedTime,
  };
};
