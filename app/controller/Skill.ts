import { Api } from "@/src/api";
import { useToast } from "@/src/contexts/toast";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSkillController = () => {
  const skillType = useBetterState<SkillType[]>([]);
  const selectedSkills = useBetterState<number[]>([]);
  const { replace } = useRouter();
  const { colorScheme } = useColorScheme();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const maxNumberOfSkills = 9;

  const load = useCallback(async () => {
    try {
      const { data } = await Api.skillType.all();

      skillType.value = data;
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const handlerSelectSkill = (skillTypeId: number) => {
    if (selectedSkills.value.includes(skillTypeId)) {
      selectedSkills.value = selectedSkills.value.filter(
        (item) => item !== skillTypeId
      );
    } else selectedSkills.value = [...selectedSkills.value, skillTypeId];
  };

  const handlerSaveUserSkills = useCallback(() => {
    try {
      if (
        selectedSkills.value.length >= 3 &&
        selectedSkills.value.length <= maxNumberOfSkills
      ) {
        dispatch(isLoading(true));
        selectedSkills.value.map((id, index) => {
          Api.skill
            .add({
              name: "",
              skillTypeId: id,
            })
            .then(() => {
              if (index === selectedSkills.value.length - 1) {
                replace("root/main");
                dispatch(isLoading(false));
              }
            })
            .finally(() => {
              if (index === selectedSkills.value.length - 1) {
                dispatch(isLoading(false));
              }
            });
        });
      } else
        toast?.({
          title: "Ooopps!!!",
          type: "info",
          subtitle: `Deves adicionar entre 3 e ${maxNumberOfSkills} habilidades.`,
        });
    } catch (error) {
      console.log({ error });
    }
  }, [selectedSkills, maxNumberOfSkills]);

  useEffect(() => {
    load();
  }, []);

  return {
    skillType,
    handlerSelectSkill,
    selectedSkills,
    colorScheme,
    handlerSaveUserSkills,
    maxNumberOfSkills,
  };
};
