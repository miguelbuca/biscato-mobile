import { Api } from "@/src/api";
import { User } from "@/src/interfaces";
import { AuthSelectors, setCurrentUser } from "@/src/reduxStore/slices/auth";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLayoutController = () => {
  const SUB_VALUE = 5;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user: User = useSelector(AuthSelectors)?.user;

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
    user,
    SUB_VALUE,
    navigation,
  };
};
