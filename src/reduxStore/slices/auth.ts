import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/src/interfaces";

type Auth = {
  user?: User;
};

const initialState: Auth = {};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const AuthSelectors = (state: RootState) => state.Auth;

export const { setCurrentUser } = AuthSlice.actions;

export default AuthSlice.reducer;
