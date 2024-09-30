import "./foodCard.css";
import React from "react";
import CartSidebar from "../CartSidebar/CartSidebar";
import { FoodItemCard } from "./FoodItemCard";
import { useSelector } from "react-redux";

const FoodList = ({
  foodList,
  showCart,
  setShowCart,
  handleCartItemClick,
  cart,
  setCart,
  setshowAddress,
}) => {
  const cartData = useSelector((state) => state.cartList);
  return (
    <>
      <section className="card_section">
        <div
          className="to_close_sidebar"
          onClick={() => setShowCart(false)}
          style={{ width: showCart ? "100%" : "0" }}
        >
          {" "}
        </div>
        <CartSidebar
          setShowCart={setShowCart}
          showCart={showCart}
          cart={cart}
          setCart={setCart}
          setshowAddress={setshowAddress}
        />
        {foodList?.map((foodItem) => (
          <FoodItemCard
            foodItem={foodItem}
            key={foodItem.id}
            handleCartItemClick={handleCartItemClick}
            isAlreadyInCart={
              !!cartData.find((cartItem) => cartItem.name === foodItem.name)
            }
          />
        ))}
      </section>
    </>
  );
};

export default FoodList;
