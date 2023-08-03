import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Skill, Work } from "@/src/interfaces";
import {
  Filter,
  FilterSelectors,
  setJobFilter,
} from "@/src/reduxStore/slices/filter";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useHomeController = () => {
  const userSkills = useBetterState<Skill[]>([]);
  const works = useBetterState<Work[]>([]);
  const refreshing = useBetterState<boolean>(false);
  const dispatch = useDispatch();
  const filter: Filter = useSelector(FilterSelectors);

  const load = useCallback((fltr?: Filter) => {
    try {
      dispatch(isLoading(true));
      Api.skill?.me().then(({ data }) => {
        userSkills.value = data;
      });

      Api.work
        ?.all(fltr)
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

  const handlerSkillType = (value: string) => {
    dispatch(
      setJobFilter({
        skillType: value,
      })
    );
    load({
      job: {
        skillType: value,
      },
    });
  };
  useEffect(load, []);

  return {
    filter,
    handlerSkillType,
    userSkills,
    works,
    refreshing,
    load,
  };
};
