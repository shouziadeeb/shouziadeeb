/* eslint-disable react/prop-types */
import "./foodCard.css";
import React, { useEffect, useRef } from "react";
import CartSidebar from "../CartSidebar/CartSidebar";
import { FoodItemCard } from "./FoodItemCard";
import { useSelector } from "react-redux";

const FoodList = ({
  foodList = [],
  showCart,
  setShowCart,
  handleCartItemClick,
  cart,
  setCart,
  hasMore,
  fetchMore,
  setshowAddress,
  isLoading,
}) => {
  const cartData = useSelector((state) => state.cartList.items) || [];

  const loaderRef = useRef(null);

  // Infinite scroll using IntersectionObserver (more efficient than scroll listener)
  useEffect(() => {
    if (!hasMore || !fetchMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchMore, hasMore]);

  return (
    <section className="card_section">
      {/* Overlay for closing cart */}
      <div
        className="to_close_sidebar"
        onClick={() => setShowCart(false)}
        style={{ width: showCart ? "100%" : "0" }}
      />

      {/* Sidebar */}
      <CartSidebar
        setShowCart={setShowCart}
        showCart={showCart}
        cart={cart}
        setCart={setCart}
        setshowAddress={setshowAddress}
      />

      {/* Food Items */}
      {foodList.length > 0 ? (
        foodList.map((foodItem) => (
          <FoodItemCard
            foodItem={foodItem}
            key={foodItem._id} // fallback for MongoDB _id
            handleCartItemClick={handleCartItemClick}
            isAlreadyInCart={cartData.some(
              (cartItem) => cartItem.name === foodItem.name
            )}
          />
        ))
      ) : (
        <div className="no_item_found">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            alt="No Item Found"
          />
          <h1>No Item Found</h1>
        </div>
      )}

      {/* Loader / End Messages */}
      {isLoading && <p>Loading more items...</p>}
      {!hasMore && foodList.length > 0 && <p>No more items to load</p>}

      {/* Invisible div that triggers IntersectionObserver */}
      {hasMore && !isLoading && <div ref={loaderRef} style={{ height: 1 }} />}
    </section>
  );
};

export default FoodList;
