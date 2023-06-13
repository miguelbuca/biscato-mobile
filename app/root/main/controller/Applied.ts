import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Work } from "@/src/interfaces";
import { useCallback, useEffect } from "react";

export const useAppliedController = () => {
  const works = useBetterState<Work[]>([]);
  const refreshingWork = useBetterState<boolean>(false);

  const loadWork = useCallback(() => {
    try {
      Api.work?.me().then(({ data }) => {
        works.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const load = useCallback(() => {
    try {
      loadWork();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(load, []);

  return {
    works: {
      state: works,
      load: loadWork,
      refresh: refreshingWork,
    },
  };
};
