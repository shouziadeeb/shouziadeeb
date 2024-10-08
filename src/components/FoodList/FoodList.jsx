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
  const cartData = useSelector((state) => state.cartList.items);
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
        {foodList.map((foodItem) => (
          <FoodItemCard
            foodItem={foodItem}
            key={foodItem.id}
            handleCartItemClick={handleCartItemClick}
            isAlreadyInCart={
              cartData &&
              cartData.length > 0 &&
              !!cartData.find((cartItem) => cartItem.name === foodItem.name)
            }
          />
        ))}
        {foodList.length === 0 && (
          <div className="no_item_found">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
              alt=""
            />
            <h1>No Item Found</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default FoodList;
