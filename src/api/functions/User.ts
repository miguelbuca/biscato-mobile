import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { User } from "@/src/interfaces";

export const UserFunction = (axios: AxiosStatic) => {
  const me = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<User>("/users/me");
  };
  return {
    me,
  };
};
