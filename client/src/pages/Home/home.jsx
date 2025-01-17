// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";
import SectionHeading from "@/component/home component/Section heading/section";

// Hooks
import { Context } from "@/context";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Home Component
import CountdownTimer from "@/component/home component/Timer/countDown";
import ProductCard from "@/component/home component/Product Card/productCard.jsx";
import CateoryCard from "@/component/home component/Category card/card";
import AboutCard from "@/component/about Component/About card";
import Button from "@/component/Button/Button";

// SVGs and img
import furniture from "../../assets/Home assets/Category Card/furniture.svg";
import groceries from "../../assets/Home assets/Category Card/groceries.svg";
import beauty from "../../assets/Home assets/Category Card/beauty.svg";
import fragrances from "../../assets/Home assets/Category Card/perfume.svg";
import Banner from "../../assets/Home assets/FurnitureSale.png";
import Delivery from "../../assets/About assets/services/delivery.svg";
import CustomerCare from "../../assets/About assets/services/customerService.svg";
import MoneyBackGuarantee from "../../assets/About assets/services/moneyBack.svg";
import WomenCollection from "../../assets/Home assets/Coming Soon/womenCollection.svg";
import PlayStations from "../../assets/Home assets/Coming Soon/playStation.svg";
import Speakers from "../../assets/Home assets/Coming Soon/speaker.svg";
import GucciPerfume from "../../assets/Home assets/Coming Soon/gucciPerfume.svg";

function HomePage() {
  const location = useLocation();
  const {
    products,
    setCategoryProducts,
    setSearch,
    shuffledProducts,
    sliceCount,
  } = useContext(Context);
  const navigate = useNavigate();

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
    setSearch("All Product");
    navigate("/category");
  };

  return (
    <>
      <HeroSection />
      <NavBar />
      {/* Banner */}
      <div className="m-4 sm:m-5 md:m-6 lg:flex lg:justify-center lg:m-8">
        <img
          src={Banner}
          alt=""
          className="w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh] 2xl:h-[73vh]"
        />
      </div>

      {/* Sale Products */}
      <div className="mx-2 border-b-2 sm:mx-3 sm:my-2 md:my-5 lg:h-1/4 lg:mx-2.5 lg:my-0 lg:py-5 xl:mx-[13px] xl:h-1/4 xl:my-4 xl:py-10 xl:w-[97vw] 2xl:mx-4">
        <SectionHeading heading={"Today's"} />
        <CountdownTimer targetDate="2025-01-30T23:59:59" />
        {/* Products */}
        <div className="grid grid-cols-2 w-full justify-items-center sm:grid-cols-3 sm:my-5 md:grid-cols-4 lg:w-[95vw] lg:ml-5 xl:grid-cols-5  xl:w-[97vw]">
          {shuffledProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="flex justify-center my-3 md:my-4 lg:w-full lg:my-5">
          <Button
            width="w-36 sm:w-40 md:w-44 lg:w-48"
            rounded="rounded-sm"
            padding="p-2.5"
            handleFunc={handleViewAllProducts}
            title="View All Products"
          />
        </div>
      </div>

      {/* Categorys Section*/}
      <div className="h-[60vh] border-b-2 mx-2 my-5 sm:mx-4 sm:h-[45vh] lg:h-96 lg:w-[97vw] lg:mx-0 lg:ml-4 lg:py-10">
        <SectionHeading heading={"Categories"} />
        {/* headings */}
        <div className="mx-2.5 my-1.5 sm:my-2.5 md:mx-2 md:my-2.5 lg:mx-7 lg:my-3">
          <p className="font-semibold text-xl sm:text-2xl lg:text-3xl">
            Browse By Cateory
          </p>
        </div>

        {/* Category */}
        <div className="md:flex md:justify-center md:items-center md:h-[30vh]">
          <div className="grid grid-cols-2 justify-items-center sm:flex sm:justify-evenly md:w-[80vw] ">
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
      <div className="mx-2 my-5 sm:ml-4 md:my-10 lg:h-2/3 lg:py-10 lg:w-[97vw]">
        <SectionHeading heading={"Our Products"} />
        {/* Heading */}
        <div className="m-2.5 my-1.5 md:my-2.5 lg:mx-7 lg:my-3">
          <p className="text-lg font-semibold sm:text-2xl lg:text-3xl">
            Explore Our Products
          </p>
        </div>
        {/* Products */}
        <div className="grid grid-cols-2 justify-items-center ml-2.5 sm:grid-cols-3 md:grid-cols-4 md:ml-1 lg:w-[95vw] xl:grid-cols-5 xl:w-[97vw] lg:my-10 lg:ml-5">
          {products.slice(0, sliceCount[1]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center my-3  lg:w-full lg:my-5 ">
          <Button
            width="w-36 sm:w-40 md:w-44 lg:w-48"
            rounded="rounded-sm"
            padding="p-2.5"
            handleFunc={handleViewAllProducts}
            title="View All Products"
          />
        </div>
      </div>

      {/* Coming Soon Products */}
      <div className="ml-2 my-10 lg:my-0 lg:ml-4">
        <SectionHeading heading={"Features"} />
        <p className="ml-2 my-1.5 text-lg font-semibold md:my-3 md:text-xl lg:ml-7 lg:my-4 lg:text-4xl">
          COMING SOON
        </p>

        <div className="my-5 mx-1 sm:flex lg:mx-8 lg:my-11">
          <img
            src={PlayStations}
            alt="Play Stations"
            className="hidden sm:block sm:w-[48vw] sm:h-auto lg:w-[45vw] 2xl:w-[46vw]"
          />

          <div className="sm:flex sm:flex-col sm:ml-1.5 lg:ml-2.5 xl:ml-10 2xl:ml-20 ">
            <div className="flex justify-center sm:block">
              <img
                src={WomenCollection}
                alt="women Collections"
                className="w-[90vw] my-1 sm:my-0 sm:w-[51vw] lg:w-[45.5vw] xl:[50vw] xl:mb-6 2xl:mb-6 2xl:w-[46vw]"
              />
            </div>
            <div className="flex my-1 justify-evenly lg:justify-normal lg:mt-2 xl:jutify-center">
              <img
                src={Speakers}
                alt="speakers"
                className="w-[43vw] mr-1 sm:w-[24vw] lg:w-[22.5vw] xl:mr-10 xl:w-[21vw] 2xl:w-[22vw]"
              />
              <img
                src={GucciPerfume}
                alt="Gucci Perfumes"
                className="w-[43vw] sm:w-[24vw] lg:w-[22.5vw] xl:w-[21vw] 2xl:w-[22vw]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-14 md:flex md:justify-center md:items-center md:h-[55vh]">
        <div className="flex justify-center my-2 sm:my-0 md:inline-flex">
          <AboutCard
            figure="Free and Fast Delivery"
            detail="Free delivery for all order above $140"
            box={false}
            width="w-[55vw] sm:w-[34vw] md:w-[29vw] lg:w-[30vw] xl:w-[20vw]"
            height="h-[25vh]"
            fontSize="text-lg sm:text-2xl"
            fontWeight="font-semibold"
            pathSrc={Delivery}
          />
          <AboutCard
            figure="24/7 Customer Service"
            detail="Friendly 24/7 customer support"
            box={false}
            width="w-[55vw] sm:w-[35vw] md:w-[29.8vw] lg:w-[30vw] xl:w-[20vw]"
            height="h-[25vh]"
            fontSize="text-lg sm:text-2xl"
            fontWeight="font-semibold"
            pathSrc={CustomerCare}
          />
        </div>
        <div className="flex justify-center md:inline-flex ">
          <AboutCard
            figure="Money Back Guarantee"
            detail="We return money in 30 days"
            box={false}
            width="w-[45vw] sm:w-[36vw] md:w-[30.5vw] lg:w-[30vw] xl:w-[20vw]"
            height="h-[25vh]"
            fontSize="text-lg sm:text-2xl"
            fontWeight="font-semibold"
            pathSrc={MoneyBackGuarantee}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
