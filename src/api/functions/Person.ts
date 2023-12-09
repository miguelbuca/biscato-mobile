import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Person } from "@/src/interfaces";

export const PersonFunction = (axios: AxiosStatic) => {
  const create = async (data: FormData | Person) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Person>("/persons", data);
  };
  const update = async (data: Person, id?: number) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.patch<Person>(`/persons/${id}`, {
      ...data,
    });
  };
  return {
    create,
    update,
  };
};
