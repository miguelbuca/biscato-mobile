import { Api } from "@/src/api";
import { User } from "@/src/interfaces";
import { useNavigation, useRouter } from "expo-router";
import { useCallback } from "react";

export const useSignInController = () => {
  const { navigate } = useNavigation();
  const { replace } = useRouter();

  const handler = useCallback((values: User) => {
    try {
      Api.auth.signIn(values).then(({ access_token }) => {
        if (access_token) {
          replace("../root/main");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    navigate,
    handler,
  };
};
