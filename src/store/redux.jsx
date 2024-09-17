import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice(
  {
  name: "vary",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      console.log(action.payload);
    },
    handleQuantity(state, action) {
      const { item, number } = action.payload;

      // Find the index of the item to update
      const itemIndex = state.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      // Check if the item exists in the cart
      if (itemIndex !== -1) {
        const updatedItem = {
          ...state[itemIndex],
          qty: state[itemIndex].qty + number,
        };

        // If the updated quantity is less than 1, remove the item from the cart
        if (updatedItem.qty < 1) {
          return state.filter((cartItem) => cartItem.name !== item.name); 
        }

        // Update the total price
        if (number > 0) {
          updatedItem.totalPrice = parseInt(item.price) * updatedItem.qty;
        } else if (number < 0) {
          updatedItem.totalPrice -= parseInt(item.price);
        }

        // Update the cart with the modified item
        state[itemIndex] = updatedItem;
      }

     
    },
  },
  });
export const { addToCart, handleQuantity } = cart.actions;
