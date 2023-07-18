import {
  AddressFunction,
  ApplicationFunction,
  AuthFunction,
  ChatFunction,
  GoogleFunction,
  SkillFunction,
  SkillTypeFunction,
  UserFunction,
  WorkFunction,
} from "./functions";

import axios from "axios";

import * as Constants from "expo-constants";
import io from "socket.io-client";

export const socket = io("ws://192.168.1.103:3333", {
  autoConnect: true,
});

axios.defaults.baseURL = Constants.default.expoConfig?.extra?.api;
axios.defaults.headers.common["Content-Type"] = "application/json";

console.log(socket.connected)

export const Api = {
  user: UserFunction(axios),
  auth: AuthFunction(axios),
  skillType: SkillTypeFunction(axios),
  skill: SkillFunction(axios),
  work: WorkFunction(axios),
  application: ApplicationFunction(axios),
  address: AddressFunction(axios),
  chat: ChatFunction(socket),
  external: {
    google: GoogleFunction(
      Constants.default.expoConfig?.extra?.googleMapsApiKey
    ),
  },
};
