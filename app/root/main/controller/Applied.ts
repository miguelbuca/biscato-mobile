import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Application, Work } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAppliedController = () => {
  const dispatch = useDispatch();
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
      Api.application
        ?.me()
        .then(({ data }) => {
          applications.value = data;
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const load = useCallback(() => {
    try {
      dispatch(isLoading(true));
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
