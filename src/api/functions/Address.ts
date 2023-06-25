import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Address } from "@/src/interfaces";

export const AddressFunction = (axios: AxiosStatic) => {
  const nearby = async (lat: number, lng: number) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get<Address[]>(`/addresses/${lat}/${lng}`);
  };
  return {
    nearby,
  };
};
