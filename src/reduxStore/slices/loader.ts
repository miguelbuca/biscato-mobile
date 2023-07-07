import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Loader = {
  state?: boolean;
};

const initialState: Loader = {
  state: false,
};

const LoaderSlice = createSlice({
  name: "Loader",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.state = action.payload;
    },
  },
});

export const LoaderSelectors = (state: RootState) => state.Loader;

export const { isLoading } = LoaderSlice.actions;

export default LoaderSlice.reducer;
