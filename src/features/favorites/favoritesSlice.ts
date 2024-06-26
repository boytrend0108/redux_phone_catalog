import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

export type FavoritesState = {
  favorites: Product[];
}

const initialState: FavoritesState = {
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
      state.favorites = state.favorites.filter(el => el.id !== action.payload.id)
    }
  }
})

export default favoritesSlise.reducer;
export const { add, remove } = favoritesSlise.actions;