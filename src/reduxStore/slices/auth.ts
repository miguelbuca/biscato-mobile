import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Person, User } from "@/src/interfaces";
import { format } from "@/src/helper/format";

type Auth = {
  user?: User;
  selectedPersonIndex?: number;
  activePerson?: Person;
};

const initialState: Auth = {
  selectedPersonIndex: 0,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;

      const person = state?.user?.persons?.[0];

      if (person) {
        state.activePerson = {
          ...person,
          avatar: format().assetURL(person.avatar || ""),
        };
      }
    },
    setSelectedPersonIndex(state, action) {
      const person = state?.user?.persons?.[action.payload];

      if (person) {
        state.activePerson = {
          ...person,
          avatar: format().assetURL(person.avatar || ""),
        };
      }

      state.selectedPersonIndex = action.payload;
    },
    setActivePerson(state, action) {
      state.activePerson = {
        ...action.payload,
        avatar: format().assetURL(action.payload.avatar || ""),
      };
    },
  },
});

export const AuthSelectors = (state: RootState) => state.Auth;

export const { setCurrentUser, setSelectedPersonIndex, setActivePerson } =
  AuthSlice.actions;

export default AuthSlice.reducer;
