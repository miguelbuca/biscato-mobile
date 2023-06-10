import { useBetterState } from "@/src/hooks/useBetterState";
import { setCurrentUser } from "@/src/reduxStore/slices/auth";
import { useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { save, getValueFor } from "@/src/helper/storage";
import { Api } from "@/src/api";

export const usePageController = () => {
  const isReady = useBetterState<boolean>(false);
  const { navigate }: any = useNavigation();
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const load = useCallback(async () => {
    const [access_token, appIntroSlider] = await Promise.all([
      getValueFor("access_token"),
      getValueFor("AppIntroSlider"),
    ]);

    if (access_token) {
      try {
        const { data } = await Api.user.me();
        dispatch(setCurrentUser(data));
        replace("root/main");
      } catch (error) {
        replace("auth/Sign-in");
      }
    } else {
      if (!appIntroSlider) save("AppIntroSlider", "true");
      else replace("auth/Sign-up");
    }
    isReady.value = true;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isReady.value = true;
    }, 1000);
  }, []);

  return {
    navigate,
    load,
    isReady,
  };
};
