import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType, Work } from "@/src/interfaces";
import { useCallback, useEffect } from "react";

export const usePublicationController = () => {
  const skillTypes = useBetterState<SkillType[]>([]);
  const selectedTime = useBetterState<string>("");
  const handlerCreateWork = useCallback(async (values: Work) => {
    try {
      const { data } = await Api.work.create({
        ...values,
        costPerHour: parseFloat(`${values.costPerHour}`),
        skillTypeId: parseInt(`${values.skillTypeId}`),
        totalTime: parseInt(`${values.totalTime}`),
      });
    } catch (error) {
      console.log({ error });
    }
  }, []);

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
    skillTypes,
    selectedTime,
    handlerCreateWork,
  };
};
