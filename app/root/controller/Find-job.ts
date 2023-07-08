import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFindJobController = () => {
  const dispatch = useDispatch();
  const skilltypes = useBetterState<SkillType[]>([]);

  const load = useCallback(() => {
    dispatch(isLoading(true));
    Api.skillType
      .all()
      .then(({ data }) => {
        skilltypes.value = data;
      })
      .finally(() => dispatch(isLoading(false)));
  }, []);

  useEffect(load, []);

  return {
    skilltypes,
  };
};
