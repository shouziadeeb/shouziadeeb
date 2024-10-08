import "./foodCard.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function FoodItemCard({
  foodItem,
  handleCartItemClick,
  isAlreadyInCart,
}) {
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();

  const addNewCart = (payload) => {
    dispatch(addToCart(payload));
  };

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="food_card">
      {loading ? (
        // Skeleton for loading state (adjust sizes to match your card CSS)
        <>
          <Skeleton
            height={"24vw"} // Match the responsive image size in your CSS
            width={"24vw"}
            borderRadius={"5%"}
          />{" "}
          {/* Image skeleton */}
          <Skeleton height={"4.4vw"} width={`60%`} /> {/* Name skeleton */}
          <Skeleton height={"4.4vw"} width={`80%`} /> {/* Content skeleton */}
          <Skeleton height={"4.4vw"} width={`40%`} /> {/* Price skeleton */}
          <Skeleton height={"6vw"} width={"30%"} /> {/* Button skeleton */}
        </>
      ) : (
        // Actual content once loading is done
        <>
          <img src={foodItem.img} alt={foodItem.name} />
          <div className="card_text">
            <h4>{foodItem.name}</h4>
            <p>{foodItem.content}</p>
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
        </>
      )}
    </div>
  );
}
