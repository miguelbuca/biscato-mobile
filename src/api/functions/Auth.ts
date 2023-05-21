import { User } from "@/src/interfaces";
import { AxiosStatic } from "axios";

import { save, getValueFor } from "@/src/helper/storage";

export const AuthFunction = (axios: AxiosStatic) => {
  const signIn = async (credentials: Pick<User, "email" | "password">) => {
    const { data } = await axios.post<{ access_token: string }>(
      "/auth/signin",
      credentials
    );
    save("access_token", data.access_token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
    return data;
  };
  const signUp = async (user: User) => {
    const { data } = await axios.post<{ access_token: string }>(
      "/auth/signup",
      user
    );
    save("access_token", data.access_token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
    return data;
  };
  return {
    signIn,
    signUp,
  };
};
