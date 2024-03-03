import { configureStore } from '@reduxjs/toolkit';
import phonesSlice from '../features/phones/phonesSlice';

export const store = configureStore({
  reducer: {
    phones: phonesSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

