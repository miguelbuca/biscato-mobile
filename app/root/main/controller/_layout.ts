import { Api } from "@/src/api";
import { setCurrentUser } from "@/src/reduxStore/slices/auth";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useLayoutController = () => {
  const SUB_VALUE = 5;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const load = useCallback(() => {
    try {
      Api.user.me().then(({ data }) => {
        dispatch(setCurrentUser(data));
      });
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(load, []);

  return {
    SUB_VALUE,
    navigation,
  };
};
