import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Application } from "@/src/interfaces";

export const ApplicationFunction = (axios: AxiosStatic) => {
  const me = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get("/applications/me");
  };
  const create = async (data: Application) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Application>("/applications", data);
  };
  const remove = async (id: number) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.delete<Application>("/applications/" + id);
  };
  const candidates = async (id: string | number) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<Application[]>("/applications/works/" + id);
  };
  return {
    me,
    create,
    remove,
    candidates,
  };
};
