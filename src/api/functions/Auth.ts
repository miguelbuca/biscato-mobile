import { User } from "@/src/interfaces";
import { UserFunction } from "./User";

export const AuthFunction = () => {
  const signIn = async (credentials: Pick<User, "email" | "password">) => {
    console.log("credentials", credentials);
  };
  const signUp = async (user: User) => {
    return UserFunction(user).create();
  };
  return {
    signIn,
    signUp,
  };
};
