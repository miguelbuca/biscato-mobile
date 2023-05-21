import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "./slices/auth";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["contacts", "session"],
};

const rootReducer = combineReducers({
  auth,
});

export { rootPersistConfig, rootReducer };
