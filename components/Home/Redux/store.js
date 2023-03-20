import { configureStore } from "@reduxjs/toolkit";
import offerapp from "./ReduxHome";
export const store = configureStore({
  reducer: {
    offerapp: offerapp,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
