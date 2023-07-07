import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authSlice from "./slices/auth";
import loaderSlice from "./slices/loader";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Auth"],
};

const rootReducer = combineReducers({
  Auth: authSlice,
  Loader: loaderSlice,
});

export { rootPersistConfig, rootReducer };
