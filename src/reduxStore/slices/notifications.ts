import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Notification = {
  count?: number;
};

const initialState: Notification = {
  count: 0,
};

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    setNotificationCount(state, action) {
      state.count = action.payload;
    },
  },
});

export const notificationSelectors = (state: RootState) => state.Notification;

export const { setNotificationCount } = NotificationSlice.actions;

export default NotificationSlice.reducer;
