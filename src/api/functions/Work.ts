import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Work } from "@/src/interfaces";

export const WorkFunction = (axios: AxiosStatic) => {
  const create = async (data: Work) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Work>("/works", data);
  };
  return {
    create,
  };
};
