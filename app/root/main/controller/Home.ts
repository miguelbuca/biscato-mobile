import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Skill, Work } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHomeController = () => {
  const userSkills = useBetterState<Skill[]>([]);
  const works = useBetterState<Work[]>([]);
  const refreshing = useBetterState<boolean>(false);
  const dispatch = useDispatch();

  const load = useCallback(() => {
    try {
      dispatch(isLoading(true));
      Api.skill?.me().then(({ data }) => {
        userSkills.value = data;
      });

      Api.work
        ?.all()
        .then(({ data }) => {
          works.value = data;
        })
        .finally(() => {
          dispatch(isLoading(false));
        });
    } catch (error) {
      console.log(error);
    } finally {
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
