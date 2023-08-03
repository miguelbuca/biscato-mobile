import {
  AddressFunction,
  ApplicationFunction,
  AuthFunction,
  ChatFunction,
  GoogleFunction,
  PersonFunction,
  SkillFunction,
  SkillTypeFunction,
  UserFunction,
  WorkFunction,
} from "./functions";

import axios from "axios";

import * as Constants from "expo-constants";
import io from "socket.io-client";
import { getValueFor } from "../helper/storage";

export const socket = io(Constants.default.expoConfig?.extra?.api, {
  autoConnect: true,
  auth: async (cb) => {
    const token = await getValueFor("access_token");
    cb({ token });
  },
});

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
  persson: PersonFunction(axios),
  chat: ChatFunction(socket),
  external: {
    google: GoogleFunction(
      Constants.default.expoConfig?.extra?.googleMapsApiKey
    ),
  },
};
