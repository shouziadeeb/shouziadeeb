import React, { useEffect, useMemo, useState } from "react";
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
import MyOrder from "../MyOrders/MyOrder";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    offer: "",
    price: [],
  });
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [showOnScroll, setShowOnScroll] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };
  const cartData = useSelector((state) => state.cartList.items);
  const orderedData = useSelector((state) => state.cartList.myOrders);
  const handleFilterCatoegory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
      offer: value,
      price: [],
    }));
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If the user is scrolling down, hide the div
      if (currentScrollY > lastScrollY) {
        setShowOnScroll(false);
      } else {
        // If the user is scrolling up, show the div
        setShowOnScroll(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleCategory = (value) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };
  const handleOffer = (value) => {
    setFilters((prev) => ({ ...prev, offer: value }));
  };
  // console.log(filters.category);
  // console.log(filters.offer);
  // console.log(filters.category)
  const handlePrice = (a, b) => {
    // setFilters((prev) => ({ ...prev, price: value }));
    setFilters((prev) => ({ ...prev, price: [a, b] }));
  };
  // console.log(filters.price.length > 0, filters.price);
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
        // console.log("price", filters.price);
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
        badgeCounter={cartData && cartData.length}
        setSidebar={setShowCart}
        searchValue={filters.search}
        handleSearch={handleSearch}
        handleOffer={handleOffer}
      />
      <CarouselSecond />
      <Suggest
        foodList={foods}
        handleFilterCatoegory={handleFilterCatoegory}
        handleCategory={handleCategory}
        isFilterAdded={
          filters.category ||
          filters.search ||
          filters.price.length > 0 ||
          filters.offer
        }
        handlePrice={handlePrice}
      />
      <div className="hr_tag">
        <p>WHAT'S ON YOUR MIND</p>
        <hr />
      </div>
      <div className="foodList_container">
        <FoodList
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
        style={{
          display:
            cartData && cartData.length > 0 && window.innerWidth < 600
              ? "block"
              : "none",
        }}
      >
        <div className="for_mobileCart">
          <p>
            <span>{cartData && cartData.length}</span>
            {cartData && cartData.length > 1 ? " Items" : " Item"} Added
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
      <div
        className="myOrder_for_mobile"
        style={{
          height: showOnScroll && window.innerWidth < 600 ? "18vw" : "0",
        }}
      >
        <div className="for_mobile_order">
          <span>
            <FaShoppingBag />
          </span>{" "}
          Cart
        </div>
        <hr />
        <div className="for_mobile_order" onClick={() => navigate("/orders")}>
          <span>
            <FaShoppingBag />
          </span>{" "}
          Order
          <span style={{ color: "black", fontWeight: "bolder" }}>
            {orderedData.length}
          </span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
