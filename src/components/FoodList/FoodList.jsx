import "./foodCard.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const [displayedItems, setDisplayedItems] = useState(foodList.slice(0, 10)); // Initially display 10 items
  const [hasMore, setHasMore] = useState(true);

  // Using useRef to track loading status without causing re-renders
  const isLoading = useRef(false);

  // Function to load more items
  const loadMoreItems = useCallback(() => {
    if (isLoading.current || !hasMore) return;

    isLoading.current = true;
    setTimeout(() => {
      const newItems = foodList.slice(
        displayedItems.length,
        displayedItems.length + 10
      ); // Load 10 more items

      if (newItems.length === 0) {
        setHasMore(false); // No more items to load
      } else {
        setDisplayedItems((prevItems) => [...prevItems, ...newItems]);
      }

      isLoading.current = false;
    }, 700); // Simulate a loading time
  }, [displayedItems.length, foodList, hasMore]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollTop >= fullHeight - 1000) {
      // Trigger loadMore when scrolled within 100px of the bottom
      loadMoreItems();
    }
  }, [loadMoreItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Reset when the foodList changes (for example, on search or filter)
    setDisplayedItems(foodList.slice(0, 10));
    setHasMore(true);
  }, [foodList]);

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
        {/* Display Food Items with Infinite Scroll */}
        {displayedItems.map((foodItem) => (
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
        {isLoading.current && <p>Loading more items...</p>}
        {!hasMore && <p>No more items to load</p>}
        {foodList.length === 0 && (
          <div className="no_item_found">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
              alt="No Item Found"
            />
            <h1>No Item Found</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default FoodList;
