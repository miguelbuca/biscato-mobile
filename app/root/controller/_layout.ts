import { Api } from "@/src/api";
import { Person, User } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useSelector } from "react-redux";

export const useLayoutController = () => {
  const { replace } = useRouter();
  const { colorScheme } = useColorScheme();

  const user: User = useSelector(AuthSelectors)?.user;
  const person: Person = useSelector(AuthSelectors)?.activePerson;

  const signOut = () => {
    Api.auth.signOut();
    replace("/auth/Sign-in");
  };

  return {
    user,
    signOut,
    person,
    colorScheme,
  };
};
