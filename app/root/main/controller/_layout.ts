import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { User } from "@/src/interfaces";
import { AuthSelectors, setCurrentUser } from "@/src/reduxStore/slices/auth";
import { notificationSelectors, setNotificationCount } from "@/src/reduxStore/slices/notifications";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLayoutController = () => {
  const SUB_VALUE = 5;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user: User = useSelector(AuthSelectors)?.user;
  const notifications = useSelector(notificationSelectors)?.count;
  const chat = useBetterState<number>(0);

  const load = useCallback(() => {
    try {
      Api.user.me().then(({ data }) => {
        dispatch(setCurrentUser(data));
      });
      Api.notification.count().then(({ data }) => {
        dispatch(setNotificationCount(data))
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
    notifications,
    chat
  };
};
