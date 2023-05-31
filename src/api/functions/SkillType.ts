import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { SkillType } from "@/src/interfaces";

export const SkillTypeFunction = (axios: AxiosStatic) => {
  const all = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<SkillType[]>("/skill-types");
  };
  return {
    all,
  };
};
