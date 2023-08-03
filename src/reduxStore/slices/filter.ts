import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Work } from "@/src/interfaces";

export type Filter = {
  job?: {
    skillType?: string;
    type?: Pick<Work, 'time'>;
    costPerHour?: {
      min?: number;
      max?: number;
    };
  };
};

const initialState: Filter = {
  job:{
    skillType: ''
  }
};

const filterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    setJobFilter(state, action) {
      state.job = action.payload;
    },
  },
});

export const FilterSelectors = (state: RootState) => state.Filter;

export const { setJobFilter } = filterSlice.actions;

export default filterSlice.reducer;
