import { Api } from "@/src/api";
import { User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export const useLayoutController = () => {
  const { replace } = useRouter();

  const user: User = useSelector(AuthSelectors)?.user;

  const signOut = () => {
    Api.auth.signOut();
    replace("/auth/Sign-in");
  };

  return {
    user,
    signOut,
  };
};
