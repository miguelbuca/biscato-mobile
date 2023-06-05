import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Skill, Work } from "@/src/interfaces";
import { useCallback, useEffect } from "react";

export const useHomeController = () => {
  const userSkills = useBetterState<Skill[]>([]);
  const works = useBetterState<Work[]>([]);
  const refreshing = useBetterState<boolean>(false);

  const load = useCallback(() => {
    try {
      Api.skill?.me().then(({ data }) => {
        userSkills.value = data;
      });

      Api.work?.all().then(({ data }) => {
        works.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(load, []);

  return {
    userSkills,
    works,
    refreshing,
    load,
  };
};
