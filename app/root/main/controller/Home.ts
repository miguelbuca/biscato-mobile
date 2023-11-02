import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Skill, SkillType, Work } from "@/src/interfaces";
import {
  Filter,
  FilterSelectors,
  setJobFilter,
} from "@/src/reduxStore/slices/filter";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";

export const useHomeController = () => {
  const userSkills = useBetterState<Skill[]>([]);
  const works = useBetterState<Work[]>([]);
  const refreshing = useBetterState<boolean>(false);
  const dispatch = useDispatch();
  const filter: Filter = useSelector(FilterSelectors);
  const modalizeRef = useRef<Modalize>(null);
  const formikRef = useRef<any>(null);

  const skillTypes = useBetterState<SkillType[]>([]);
  const selectedTime = useBetterState<string>("");

  const skillType = useBetterState<string>("");

  const skillTypeID = useBetterState<string | undefined>(undefined);
  const { colorScheme } = useColorScheme();

  const loadSkillType = useCallback(async () => {
    try {
      const { data } = await Api.skillType.me();
      skillTypes.value = data;
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const laod = () => {
    loadSkillType();
  };

  useEffect(laod, []);

  const load = useCallback(
    (fltr?: Filter) => {
      try {
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
    },
    [refreshing]
  );

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

  const handlerFilterOptions = (values: {
    minCostPerHour?: number;
    maxCostPerHour?: number;
    time?: Pick<Work, "time">;
    skillTypeId?: string;
  }): void => {
    skillTypeID.value = values.skillTypeId;
    dispatch(
      setJobFilter({
        type: values.time,
        skillType: values.skillTypeId === "0" ? "" : skillType.value,
        costPerHour: {
          max: values.maxCostPerHour,
          min: values.minCostPerHour,
        },
      })
    );
    modalizeRef.current?.close();
  };

  const handlerFilterOptionsReset = (): void => {
    dispatch(
      setJobFilter({
        skillType: "",
      })
    );
    modalizeRef.current?.close();
  };

  useEffect(() => {
    const { job: values } = filter;

    if (!values) return;

    load({
      job: {
        skillType: values.skillType,
        type: values?.type,
        costPerHour: {
          max: values.costPerHour?.max,
          min: values.costPerHour?.min,
        },
      },
    });
  }, [filter]);

  return {
    skillTypeID,
    skillType,
    formikRef,
    filter,
    handlerSkillType,
    userSkills,
    works,
    refreshing,
    load,
    modalizeRef,
    selectedTime,
    skillTypes,
    handlerFilterOptions,
    handlerFilterOptionsReset,
    colorScheme,
  };
};
