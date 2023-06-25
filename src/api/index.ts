import {
  AddressFunction,
  ApplicationFunction,
  AuthFunction,
  GoogleFunction,
  SkillFunction,
  SkillTypeFunction,
  UserFunction,
  WorkFunction,
} from "./functions";

import axios from "axios";

import * as Constants from "expo-constants";

axios.defaults.baseURL = Constants.default.expoConfig?.extra?.api;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const Api = {
  user: UserFunction(axios),
  auth: AuthFunction(axios),
  skillType: SkillTypeFunction(axios),
  skill: SkillFunction(axios),
  work: WorkFunction(axios),
  application: ApplicationFunction(axios),
  address: AddressFunction(axios),
  external: {
    google: GoogleFunction(
      Constants.default.expoConfig?.extra?.googleMapsApiKey
    ),
  },
};
