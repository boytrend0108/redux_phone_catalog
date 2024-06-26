import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../../types/cart";

export type CartState = {
  cart: CartItemType[];
  totalPrice: number;
};

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<CartItemType>) => {
      state.cart.push(action.payload)

      state.totalPrice += action.payload.priceDiscount;
    },

    removeItem: (state, action: PayloadAction<CartItemType>) => {
      state.cart = state.cart.filter(el => el.id !== action.payload.id);

      state.totalPrice -= action.payload.priceDiscount * action.payload.quantity;
    },

    increase: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(el => el.id === action.payload)

      state.cart[index].quantity += 1;

      state.totalPrice += state.cart[index].quantity;
    },

    decrease: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(el => el.id === action.payload)

      state.cart[index].quantity -= 1;

      state.totalPrice -= state.cart[index].quantity;
    }
  }
});

export default cartSlice.reducer;
export const { addNew, removeItem, increase, decrease } = cartSlice.actions;
