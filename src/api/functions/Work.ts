import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Work } from "@/src/interfaces";
import { Filter } from "@/src/reduxStore/slices/filter";

export const WorkFunction = (axios: AxiosStatic) => {
  const create = async (data: Work) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Work>("/works", data);
  };
  const all = async (filter?: Filter) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<Work[]>(`/works/${filter?.job?.skillType || ''}`);
  };
  const me = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<Work[]>("/works/me");
  };
  return {
    create,
    all,
    me,
  };
};
