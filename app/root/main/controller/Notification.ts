import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Notification } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useNotificationController = () => {
  const dispatch = useDispatch();
  const notifications = useBetterState<Notification[]>([]);
  const refreshing = useBetterState<boolean>(false);

  const handlerOpennedNotification = (index: number) => {
    const notification = notifications.value[index];
    if (!notification || !notification.id) return;
    Api.notification
      .edit(notification.id, {
        status: "INACTIVE",
      })
      .then(() => loadNotifications());
  };

  const loadNotifications = useCallback(() => {
    try {
      Api.notification.me().then(({ data }) => {
        notifications.value = data;
      });
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
