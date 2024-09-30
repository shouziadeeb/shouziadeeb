import "./foodCard.css";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/redux";

export function FoodItemCard({
  foodItem,
  handleCartItemClick,
  isAlreadyInCart,
}) {
  const dispatch = useDispatch();

  const addNewCart = (payload) => {
    dispatch(addToCart(payload));
    // console.log(payload);
  };
  return (
    <div className="food_card">
      <img src={foodItem.img} />
      <div className="card_text">
        <h4>{foodItem.name} </h4>
        <p>{foodItem.content} </p>
      </div> 
      <div className="btn">
        <p>
          ₹<span>{foodItem.price}.00</span>
        </p>
        <button
          disabled={isAlreadyInCart}
          onClick={() => {
            const cartObject = {
              name: foodItem.name,
              price: parseInt(foodItem.price),
              image: foodItem.img,
              qty: 1,
              id: foodItem.id,
              totalPrice: 1 * parseInt(foodItem.price),
            };
            handleCartItemClick(cartObject);
            addNewCart(cartObject);
          }}
        >
          {isAlreadyInCart ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
