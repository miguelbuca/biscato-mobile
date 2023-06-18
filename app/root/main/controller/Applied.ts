import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Application, Work } from "@/src/interfaces";
import { useCallback, useEffect } from "react";

export const useAppliedController = () => {
  const refreshing = useBetterState<boolean>(false);
  const works = useBetterState<Work[]>([]);
  const refreshingWork = useBetterState<boolean>(false);
  const applications = useBetterState<Application[]>([]);
  const refreshingApplication = useBetterState<boolean>(false);

  const loadWork = useCallback(() => {
    try {
      Api.work?.me().then(({ data }) => {
        works.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadApplication = useCallback(() => {
    try {
      Api.application?.me().then(({ data }) => {
        applications.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const load = useCallback(() => {
    try {
      loadWork();
      loadApplication();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(load, []);

  return {
    load,
    refreshing,
    works: {
      state: works,
      load: loadWork,
      refresh: refreshingWork,
    },
    applications: {
      state: applications,
      load: loadApplication,
      refresh: refreshingApplication,
    },
  };
};
