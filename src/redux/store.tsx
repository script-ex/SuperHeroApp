import { configureStore } from "@reduxjs/toolkit";
import { questionsSlice } from "./slices/QuestionsSlice";
import { superHerosSlice } from "./slices/SuperHerosSlice";

export const store = configureStore({
  reducer: {
    questionsSlice: questionsSlice.reducer,
    superHerosSlice: superHerosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
