import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Person, Portfolio } from "@/src/interfaces";

export const PortfolioFunction = (axios: AxiosStatic) => {
  const create = async (data: Portfolio) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.post<Person>("/portfolio", data);
  };

  const person = async (id: number | string) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<Portfolio>(`/portfolio/person/${id}`);
  };

  const update = async (data: Person, id?: number) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.patch<Portfolio>(`/portfolio/${id}`, {
      ...data,
    });
  };

  return {
    person,
    create,
    update,
  };
};
