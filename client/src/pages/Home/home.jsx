// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";
import SectionHeading from "@/component/home component/Section heading/section";

// Hooks
import { Context } from "@/context";
import { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Home Component
import CountdownTimer from "@/component/home component/Timer/countDown";
import ProductCard from "@/component/home component/Product Card/productCard.jsx";
import CateoryCard from "@/component/home component/Category card/card";
import AboutCard from "@/component/about Component/About card";

// SVGs and img
import furniture from "../../assets/Home assets/Category Card/furniture.svg";
import groceries from "../../assets/Home assets/Category Card/groceries.svg";
import beauty from "../../assets/Home assets/Category Card/beauty.svg";
import fragrances from "../../assets/Home assets/Category Card/perfume.svg";
import Banner from "../../assets/Home assets/FurnitureSale.png";
import Delivery from "../../assets/About assets/delivery.svg";
import CustomerCare from "../../assets/About assets/customer-care.svg";
import MoneyBackGuarantee from "../../assets/About assets/money-back-guarantee.svg";
import WomenCollection from "../../assets/Home assets/Coming Soon/womenCollection.svg";
import PlayStations from "../../assets/Home assets/Coming Soon/playStation.svg";
import Speakers from "../../assets/Home assets/Coming Soon/speaker.svg";
import GucciPerfume from "../../assets/Home assets/Coming Soon/gucciPerfume.svg";

function HomePage() {
  const location = useLocation();
  const { products, setCategoryProducts } = useContext(Context);
  const navigate = useNavigate();

  // Memoize randomized products
  const shuffledProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [products]);

  // handle OAuth Authentication
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    // if token provided store to local storage
    if (token) {
      console.log(token);
      localStorage.setItem("token", token);
    } else {
      console.log("no token");
    }
  }, [location.search]);

  // Handle View All products
  const handleViewAllProducts = () => {
    setCategoryProducts(products);
    navigate("/category");
  };

  return (
    <>
      <HeroSection />
      <NavBar />
      {/* Banner */}
      <div className="flex justify-center m-8">
        <img src={Banner} alt="" className="w-full h-[73vh]" />
      </div>

      {/* Sale Products */}
      <div className="h-1/4 mx-4 my-4 py-10 border-b-2 w-[97vw]">
        <SectionHeading heading={"Today's"} />
        <CountdownTimer targetDate="2024-12-30T23:59:59" />
        {/* Products */}
        <div className="grid grid-cols-5  w-[97vw] my-5 ml-5">
          {shuffledProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="w-full flex justify-center my-5 ">
          <button
            className="bg-[#DB4444] p-2.5 text-white w-48 rounded-sm"
            onClick={handleViewAllProducts}
          >
            View All Products
          </button>
        </div>
      </div>

      {/* Categorys Section*/}
      <div className="h-96 border-b-2 w-[97vw] my-5 ml-4 py-10">
        <SectionHeading heading={"Categories"} />
        {/* headings */}
        <div className="mx-7 my-3">
          <p className="text-3xl font-semibold">Browse By Cateory</p>
        </div>

        {/* Category */}
        <div className="flex justify-center items-center h-[30vh]">
          <div className="flex justify-evenly w-[80vw] ">
            <CateoryCard
              url={furniture}
              title={"Furnitures"}
              category={"furniture"}
            />
            <CateoryCard
              url={groceries}
              title={"Groceries"}
              category={"groceries"}
            />
            <CateoryCard url={beauty} title={"Cosmetics"} category={"beauty"} />
            <CateoryCard
              url={fragrances}
              title={"Perfumes"}
              category={"fragrances"}
            />
          </div>
        </div>
      </div>
      
      {/* Products Section*/}
      <div className="h-2/3  py-10 w-[97vw] my-5 ml-4 ">
        <SectionHeading heading={"Our Products"} />
        {/* Heading */}
        <div className="mx-7 my-3">
          <p className="text-3xl font-semibold">Explore Our Products</p>
        </div>
        {/* Products */}
        <div className="grid grid-cols-5  w-[97vw] my-10 ml-5">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* {Children.toArray(
            products.map((item) => (
              <>
                <ProductCard product={item} />
              </>
            ))
          )} */}
        </div>
        <div className="w-full flex justify-center my-5">
          <button
            className="bg-[#DB4444] p-2.5 text-white w-48 rounded-sm"
            onClick={handleViewAllProducts}
          >
            View All Products
          </button>
        </div>
      </div>

      {/* Coming Soon Products */}
      <div className="ml-4">
        <SectionHeading heading={"Features"} />
        <p className="ml-7 my-4 text-4xl font-semibold">COMING SOON</p>

        <div className="flex mx-8 my-11">
          <img src={PlayStations} alt="Play Stations" className="h-[103vh]" />

          <div className="flex flex-col ml-20 ">
            <img
              src={WomenCollection}
              alt="women Collections"
              className="mb-8 w-[45vw]"
            />
            <div className="flex jutify-center mt-2">
              <img src={Speakers} alt="speakers" className="mr-10 w-[21vw]" />
              <img
                src={GucciPerfume}
                alt="Gucci Perfumes"
                className="w-[21vw]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="flex justify-center items-center h-[50vh]">
        <AboutCard
          figure="FREE AND FAST DELIVERY"
          detail="Free delivery for all order above $250"
          width="20%"
          fontSize="22px"
          mBottom={false}
          fontWeight="400"
          box={false}
          pathSrc={Delivery}
        />
        <AboutCard
          figure="24/7 Customer Service"
          detail="Friendly 24/7 customer support"
          width="20%"
          fontSize="22px"
          mBottom={false}
          fontWeight="400"
          box={false}
          pathSrc={CustomerCare}
        />
        <AboutCard
          figure="MONEY BACK GUARANTEE"
          detail="We return money within 30 days"
          width="20%"
          fontSize="22px"
          mBottom={false}
          fontWeight="400"
          box={false}
          pathSrc={MoneyBackGuarantee}
        />
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
