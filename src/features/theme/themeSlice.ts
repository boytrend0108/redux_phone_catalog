import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Theme = 'dark' | 'white'

export type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    }
  }
});

export default themeSlice.reducer;
export const { switchTheme } = themeSlice.actions;