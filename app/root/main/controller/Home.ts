import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Skill } from "@/src/interfaces";
import { useCallback, useEffect } from "react";

export const useHomeController = () => {
  const userSkills = useBetterState<Skill[]>([]);

  const load = useCallback(() => {
    try {
      Api.skill?.me().then(({ data }) => {
        userSkills.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(load, []);

  return {
    userSkills,
  };
};
