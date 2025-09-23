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
  loading,
}) {
  const dispatch = useDispatch();

  const addNewCart = (payload) => {
    dispatch(addToCart(payload));
  };


  let isScreenSize = window.innerWidth > 600;
  return (
    <>
      <div className="food_card">
        {loading ? (
          <div
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: isScreenSize ? "center" : "space-between",
              display: "flex",
              flexDirection: isScreenSize && "column",
            }}
          >
            <Skeleton
              height={isScreenSize ? "155px" : "24vw"} // Match the responsive image size in your CSS
              width={isScreenSize ? "155px" : "24vw"}
              borderRadius={isScreenSize ? "50%" : "1vw"}
              style={{ marginBottom: isScreenSize && "1vw" }}
            />{" "}
            <div
              style={{
                width: "40%",
                // height: "60px",
                display: "flex",
                flexDirection: isScreenSize ? "column" : "column",
                justifyContent: "center",
                alignItems: isScreenSize ? "center" : "start",
                gap: "1vw",
                // backgroundColor: "black",
              }}
            >
              <Skeleton
                height={isScreenSize ? "2vw" : "5vw"}
                width={isScreenSize ? "140px" : "24vw"}
              />
              <Skeleton
                height={isScreenSize ? "2vw" : "5vw"}
                width={isScreenSize ? "140px" : "24vw"}
                style={{
                  marginBottom: isScreenSize && "10px",
                }}
              />
            </div>
            <Skeleton
              height={isScreenSize ? "2vw" : "5vw"}
              width={isScreenSize ? "10vw" : "20vw"}
            />{" "}
          </div>
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
    </>
  );
}
