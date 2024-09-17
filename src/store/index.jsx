import { configureStore } from "@reduxjs/toolkit";
import { cart } from "./redux";

const store = configureStore({
  reducer: {
    cartList: cart.reducer,
  },
});

export default store;
