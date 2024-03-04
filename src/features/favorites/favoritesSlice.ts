import { createSlice } from "@reduxjs/toolkit";

type FavoriteState = {
  favorites: string[];
}

const initialState: FavoriteState  = {
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