import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authSlice from "./slices/auth";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Auth"],
};

const rootReducer = combineReducers({
  Auth: authSlice,
});

export { rootPersistConfig, rootReducer };
