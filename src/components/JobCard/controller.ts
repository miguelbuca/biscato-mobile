import { Api } from "@/src/api";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useJobCardController = (id?: number) => {
  const { navigate }: any = useNavigation();
  const dispatch = useDispatch();
  const { colorScheme } = useColorScheme();

  const handlerRemoveApplication = useCallback((id?: number) => {
    if (!id) return;
    dispatch(isLoading(true));

    Api.application.remove(id).finally(() => {
      dispatch(isLoading(false));
    });
  }, []);

  return {
    handlerRemoveApplication,
    navigate,
    colorScheme,
  };
};
