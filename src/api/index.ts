import { AuthFunction, UserFunction } from "./functions";

import axios from "axios";

import * as Constants from "expo-constants";

axios.defaults.baseURL = Constants.default.expoConfig?.extra?.api;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const Api = {
  user: UserFunction(axios),
  auth: AuthFunction(axios),
};
