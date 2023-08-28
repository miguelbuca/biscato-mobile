import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Application } from "@/src/interfaces";
import { useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";

export const useCandidatesListController = () => {
  const route = useRouter()
  const candidatures = useBetterState<Application[]>([]);
  const { id } = useSearchParams<{
    id: string;
  }>();

  const load = useCallback(() => {
    if (!id) return;
    Api.application.candidates(id).then(({ data }) => {
      candidatures.value = data;
    });
  }, [id]);

  const work = useMemo(() => {
    if (candidatures.value.length < 1) return;
    return candidatures.value[0].work;
  }, [candidatures.value]);

  useEffect(load, []);

  return {
    route,
    candidatures,
    work,
  };
};
