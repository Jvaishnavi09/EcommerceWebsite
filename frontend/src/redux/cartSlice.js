import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        // If the product exists, update its quantity
        existingProduct.quantity += action.payload.quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        state.cartProducts.push({
          ...action.payload,
        });
      }
    },
    REMOVE_FROM_CART: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== String(action.payload)
      );
    },
  },
});

export default cartSlice.reducer;
export const { ADD_TO_CART, REMOVE_FROM_CART } = cartSlice.actions;
