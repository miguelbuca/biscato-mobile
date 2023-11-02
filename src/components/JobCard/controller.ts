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

  const handlerRemoveApplication = useCallback(() => {
    if (!id) return;
    dispatch(isLoading(true));

    Api.application.remove(id).then(({ data })=>{
      console.log(data)
    }).finally(() => {
      dispatch(isLoading(false));
    });
  }, [id]);

  return {
    handlerRemoveApplication,
    navigate,
    colorScheme,
  };
};
