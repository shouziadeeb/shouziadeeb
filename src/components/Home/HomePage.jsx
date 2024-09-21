import React, { useMemo, useState } from "react";
import Header from "../Header/Header";
import Suggest from "../FirstSuggestionSection/Suggest";
import foods from "../../data.json";
// import FoodList from "../FoodList/FoodList";
import { Footer } from "../Footer/Footer";
import { useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";
import FoodList from "../FoodList/FoodList";

const HomePage = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    offer: "",
    price: [],
  });
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [showAddress, setshowAddress] = useState(false);
  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };
  const cartData = useSelector((state) => state.cartList);
  const handleFilterCatoegory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
      offer: value,
      price: [],
    }));
  };
  const handleOffer = (value) => {
    setFilters((prev) => ({ ...prev, offer: value }));
  };
  const handlePrice = (a, b) => {
    // setFilters((prev) => ({ ...prev, price: value }));
    setFilters((prev) => ({ ...prev, price: [a, b] }));
  };

  const handleCartItemClick = (value) => {
    setCart((prev) => [...prev, value]);
  };
  const filterFoodData = useMemo(() => {
    return foods?.filter?.((food) => {
      let isCategoryPresent = true;
      let isNamePresent = true;
      let isOfferPresent = true;
      let isPricePresent = true;

      if (filters.category) {
        isCategoryPresent = food.category
          ?.toLowerCase()
          .includes(filters.category.toLowerCase());
      }
      if (filters.offer) {
        isOfferPresent = food.category
          ?.toLowerCase()
          .includes(filters.offer.toLowerCase());
      }
      if (filters.price.length > 0) {
        // isPricePresent = food.price < 100;
        isPricePresent =
          filters.price[0] <= food.price && food.price < filters.price[1];
        console.log("price", filters.price);
      }

      if (filters.search) {
        isNamePresent = food?.name
          ?.toLowerCase()
          .includes?.(filters.search.toLowerCase());
      }
      return (
        isCategoryPresent && isNamePresent && isOfferPresent && isPricePresent
      );
    });
  }, [filters]);
  return (
    <>
      <Header
        badgeCounter={cartData.length}
        setSidebar={setShowCart}
        searchValue={filters.search}
        handleSearch={handleSearch}
        handleOffer={handleOffer}
      />
      <Suggest
        foodList={foods}
        handleFilterCatoegory={handleFilterCatoegory}
        isFilterAdded={!!filters.category}
        handlePrice={handlePrice}
      />
      <div className="foodList_container">
        <FoodList
          setshowAddress={setshowAddress}
          showCart={showCart}
          setShowCart={setShowCart}
          setCart={setCart}
          foodList={filterFoodData}
          handleCartItemClick={handleCartItemClick}
          cart={cart}
        ></FoodList>
        <hr />
      </div>
      <Carousel />
      <Footer />
    </>
  );
};

export default HomePage;
