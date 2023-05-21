import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";

export const UserFunction = (axios: AxiosStatic) => {
  const me = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get("/users/me");
  };
  return {
    me,
  };
};
