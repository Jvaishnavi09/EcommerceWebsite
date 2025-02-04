import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSilce";
import cartReducer from "./cartSlice.js";
export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
