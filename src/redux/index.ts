import { configureStore } from "@reduxjs/toolkit";
import pagesSlice from "./pagesSlice";

//things to store in redux: pages (tabName, category)

export const store = configureStore({
  reducer: {
    pages: pagesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

//get RootState and AppDispatch types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
