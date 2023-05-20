import { User } from "@/src/interfaces";
import { UserFunction } from "./User";

export const AuthFunction = () => {
  const signIn = async (credentials: Pick<User, "email" | "password">) => {};
  const signUp = async (user: User) => {
    return UserFunction(user).create();
  };
  return {
    signIn,
    signUp,
  };
};
