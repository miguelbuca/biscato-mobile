import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Person } from "@/src/interfaces";

export const PersonFunction = (axios: AxiosStatic) => {
  const create = async (data: Person) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Person>("/persons", data);
  };
  return {
    create,
  };
};
