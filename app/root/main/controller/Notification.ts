import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Notification } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { setNotificationCount } from "@/src/reduxStore/slices/notifications";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useNotificationController = () => {
  const dispatch = useDispatch();
  const notifications = useBetterState<Notification[]>([]);
  const refreshing = useBetterState<boolean>(false);

  const handlerOpennedNotification = async (index: number) => {
    const notification = notifications.value[index];
    if (!notification || !notification.id) return;

    await Api.notification
      .edit(notification.id, {
        status: "INACTIVE",
      })
      .then(() => loadNotifications());
    await Api.notification
      .count()
      .then(({ data }) => dispatch(setNotificationCount(data)));
  };

  const loadNotifications = useCallback(async () => {
    try {
      await Api.notification.me().then(({ data }) => {
        notifications.value = data;
      });
      await Api.notification
        .count()
        .then(({ data }) => dispatch(setNotificationCount(data)));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const load = useCallback(() => {
    try {
      dispatch(isLoading(true));
      loadNotifications();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(isLoading(false));
    }
  }, []);

  useEffect(load, []);

  return {
    load,
    refreshing,
    notifications,
    handlerOpennedNotification,
  };
};
