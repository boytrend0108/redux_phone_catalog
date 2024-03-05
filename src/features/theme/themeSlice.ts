import { createSlice } from "@reduxjs/toolkit";

type Theme = 'dark' | 'white'

export type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: 'white',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: state => {
      state.theme = state.theme === 'white' ? 'dark' : 'white';
    }
  }
});

export default themeSlice.reducer;
export const { switchTheme } = themeSlice.actions;
