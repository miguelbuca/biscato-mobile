import { Api } from "@/src/api";
import { useToast } from "@/src/contexts/toast";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Application } from "@/src/interfaces";
import { useNavigation, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";

export const useCandidatesListController = () => {
  const route = useRouter();
  const navigation = useNavigation();
  const candidatures = useBetterState<Application[]>([]);
  const { id } = useSearchParams<{
    id: string;
  }>();
  const { toast } = useToast();

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

  const handlerAccept = () => {
    navigation.navigate("SwitchPaymentMethod" as never);
  };
  const handlerReject = () => {
    toast?.({
      title: "",
      subtitle: "ola mundo",
    });
  };

  const handlerPortfolio = (userId?: number) => {
    if (!userId) return;
    route.push("Portfolio?userId=" + userId);
  };

  return {
    handlerPortfolio,
    route,
    candidatures,
    work,
    handlerAccept,
    handlerReject,
  };
};
