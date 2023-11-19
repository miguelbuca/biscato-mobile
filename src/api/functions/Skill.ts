import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Skill } from "@/src/interfaces";

export const SkillFunction = (axios: AxiosStatic) => {
  const me = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get("/skills/me");
  };
  const add = async (data: Skill) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Skill>("/skills", data);
  };
  return {
    me,
    add
  };
};
