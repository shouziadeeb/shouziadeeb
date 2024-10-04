import React, { useMemo, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Header from "../Header/Header";
import Suggest from "../FirstSuggestionSection/Suggest";
import foods from "../../data.json";
import { Footer } from "../Footer/Footer";
import { useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";
import FoodList from "../FoodList/FoodList";
import HeaderMobile from "../HeaderForMobile/HeaderMobile";
import CarouselSecond from "../Carousel/CarouselSecond";
import { LogInMobile } from "../SignIn/LogInMobile";

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
      <HeaderMobile handleSearch={handleSearch} searchValue={filters.search} />

      <Header
        badgeCounter={cartData.length}
        setSidebar={setShowCart}
        searchValue={filters.search}
        handleSearch={handleSearch}
        handleOffer={handleOffer}
      />
      <CarouselSecond />
      <Suggest
        foodList={foods}
        handleFilterCatoegory={handleFilterCatoegory}
        isFilterAdded={!!filters.category}
        handlePrice={handlePrice}
      />
      <div className="hr_tag">
        <p>WHAT'S ON YOUR MIND</p>
        <hr />
      </div>
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
        <div className="hr_tag">
          <p>DID YOU ENJOY..?</p>
          <hr />
        </div>
      </div>
      <Carousel />
      <Footer />
      <div
        className="cart_mobile"
        style={{ display: cartData.length > 0 ? "block" : "none" }}
      >
        <div className="for_mobileCart">
          <p>
            <span>{cartData.length}</span>
            {cartData.length > 1 ? " Items" : " Item"} Added
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5vw",
              cursor: "pointer",
            }}
            onClick={() => setShowCart(true)}
          >
            View Cart <FaAngleRight />
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
