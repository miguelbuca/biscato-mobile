import { AxiosStatic } from "axios";
import { getValueFor } from "@/src/helper/storage";
import { Notification } from "@/src/interfaces";

export const NotificationFunction = (axios: AxiosStatic) => {
  const me = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get("/notification/me");
  };
  const edit = async (id: number, data: Notification) => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.patch("/notification/" + id, data);
  };
  const count = async () => {
    const access_token = await getValueFor("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return await axios.get("/notification/me/count");
  };
  return {
    count,
    me,
    edit
  };
};
