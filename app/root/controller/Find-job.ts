import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType } from "@/src/interfaces";
import { useCallback, useEffect } from "react";

export const useFindJobController = () => {
  const skilltypes = useBetterState<SkillType[]>([]);

  const load = useCallback(() => {
    Api.skillType.all().then(({ data }) => {
      skilltypes.value = data;
    });
  }, []);

  useEffect(load, []);

  return {
    skilltypes,
  };
};
