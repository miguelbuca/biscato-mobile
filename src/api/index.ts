import {
  AddressFunction,
  ApplicationFunction,
  AuthFunction,
  ChatFunction,
  GoogleFunction,
  NotificationFunction,
  PersonFunction,
  PortfolioFunction,
  SkillFunction,
  SkillTypeFunction,
  UserFunction,
  WorkFunction,
} from "./functions";

import axios from "axios";

import * as Constants from "expo-constants";
import { Socket } from "socket.io-client";

const { url, port } = Constants.default.expoConfig?.extra?.api;

export const baseURL = `${url}:${port["http-https"]}`

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const Api = {
  user: UserFunction(axios),
  auth: AuthFunction(axios),
  skillType: SkillTypeFunction(axios),
  skill: SkillFunction(axios),
  work: WorkFunction(axios),
  application: ApplicationFunction(axios),
  notification: NotificationFunction(axios),
  address: AddressFunction(axios),
  persson: PersonFunction(axios),
  portfolio: PortfolioFunction(axios),
  chat: (socket: Socket) => ChatFunction(axios, socket),
  external: {
    google: GoogleFunction(
      Constants.default.expoConfig?.extra?.googleMapsApiKey
    ),
  },
};
