import { createSlice } from "@reduxjs/toolkit";

export type FavoritesState = {
  favorites: string[];
}

const initialState: FavoritesState  = {
  favorites: []
};

const favoritesSlise = createSlice({
  name: 'favorite', 
  initialState,
  reducers: {
    add: (state, action) => {
      state.favorites.push(action.payload)
    },

    remove: (state, action) => {
      state.favorites = state.favorites.filter(el => el !== action.payload)
    }
  }
})

export default favoritesSlise.reducer;
export const {add, remove} = favoritesSlise.actions;