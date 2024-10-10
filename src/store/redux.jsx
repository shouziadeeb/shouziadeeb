import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "vary",
  initialState: {
    items: [], // Store the items in the cart
    AllTotal: 0, // Initialize total price
    myOrders: [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      if (Array.isArray(newItem) && newItem.length === 0) {
        // state.items.push(newItem);
        state.items = [];
      } else {
        state.items.push(newItem);
      }
    },
    handleQuantity(state, action) {
      const { item, number } = action.payload;
      const itemIndex = state.items.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (itemIndex !== -1) {
        const currentItem = state.items[itemIndex];
        const newQuantity = currentItem.qty + number;

        if (newQuantity < 1) {
          // Correctly remove the item from the array
          state.items.splice(itemIndex, 1); // Mutates the array directly
        } else {
          // Update the quantity and total price
          currentItem.qty = newQuantity;
          currentItem.totalPrice =
            parseInt(currentItem.price) * currentItem.qty;

          // Update the state with the modified item
          state.items[itemIndex] = currentItem;
        }
        console.log(action.payload);
      }
    },
    handleAllTotalPrice(state, action) {
      state.AllTotal = action.payload;
    },
    handleMyOrder(state, action) {
      const newItem = action.payload;
      if (Array.isArray(newItem) && newItem.length === 0) {
        // state.items.push(newItem);
        state.myOrders = [];
      } else {
        state.myOrders.push(newItem);
      }
    },
  },
});

export const { addToCart, handleQuantity, handleAllTotalPrice, handleMyOrder } =
  cart.actions;
