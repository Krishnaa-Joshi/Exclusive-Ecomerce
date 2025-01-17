// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";

// Hooks
import { useContext, useState } from "react";
import { Context } from "@/context";

// SVGs 
import Banner from "../../assets/category assests/banner.svg";
import searchIcon from "../../assets/category assests/searchIcon.svg";
import NotFound from "../../assets/category assests/notFound.svg"

// Component
import ProductCard from "@/component/home component/Product Card/productCard.jsx";
import EmptyState from "@/component/Account/Empty State/emptyState";

function CategoryPage() {
  const { categoryProducts,fetchProductsByCategory,setSearch, search,handleSearch } = useContext(Context);
  const [searchVal,setSearchVal] = useState("");

  // handle Search button
  const handleSeachButton = () =>{
    setSearch(searchVal);
    handleSearch();
  }

  return (
    <>
      <HeroSection />
      <NavBar />
      {/* Banner */}
      <div className="relative m-3 h-[75vw] md:m-5 md:h-[70vw] 2xl:h-[145vh]">
        <img src={Banner} alt="" className="w-full" />
        {/* heading */}
        <p className="absolute text-white font-semibold text-center text-[6vw] w-[66vw] top-[9vw] left-[13vw] sm:top-[1vw] sm:w-[70vw] sm:left-[12vw] lg:top-[3vw] xl:text-7xl xl:top-[10vw] xl:left-[14vw] xl:w-[65vw] 2xl:top-32">
          Get The Best Products At Your Home
        </p>

        {/* Search bar */}
        <div className="hidden sm:flex sm:justify-between sm:border-2 sm:border-white sm:absolute sm:backdrop-blur-3xl sm:rounded-full sm:w-[25vw] sm:top-[20vw] sm:p-[5px] sm:left-[35vw] lg:left-[37vw] lg:w-[20vw] lg:top-[22vw] xl:p-2 xl:top-[24vw] 2xl:w-80 2xl:top-[350px] 2xl:left-[550px]">
          <input
            type="text"
            placeholder="Search Products"
            className="sm:bg-transparent sm:focus:outline-none sm:text-white sm:p-2 sm:text-[2vw] sm:w-[18vw] lg:w-[15vw] lg:text-base xl:w-auto"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="sm:cursor-pointer sm:w-[4.5vw] lg:flex lg:justify-end lg:items-center lg:w-auto" onClick={handleSeachButton}>
            <img src={searchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Categorys */}
        <div className="rounded-lg mx-auto flex justify-around items-center bg-[#286F6C] text-white relative px-3 py-[4vw] bottom-[14vw] w-[86vw] lg:py-[3vw] lg:w-[80vw] 2xl:max-w-[1100px] xl:p-10">
          <div className="cursor-pointer md:text-center" onClick={()=>fetchProductsByCategory("furniture")}>
            <h2 className="font-semibold text-[12px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Furnitures</h2>
          </div>
          <div className="border-l border-white h-[5vh] sm:h-[7vh] lg:h-[10vh] xl:h-12"></div>
          <div className="cursor-pointer md:text-center" onClick={()=>fetchProductsByCategory("groceries")}>
            <h2 className="font-semibold text-[12px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Groceries</h2>
          </div>
          <div className="border-l border-white h-[5vh] sm:h-[7vh] lg:h-[10vh] xl:h-12"></div>
          <div className="cursor-pointer md:text-center" onClick={()=>fetchProductsByCategory("fragrances")}>
            <h2 className="font-semibold text-[12px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Perfumes</h2>
          </div>
          <div className="border-l border-white h-[5vh]  sm:h-[7vh] lg:h-[10vh] xl:h-12"></div>
          <div className="cursor-pointer md:text-center" onClick={()=>fetchProductsByCategory("beauty")}>
            <h2 className="font-semibold text-[12px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Cosmetics</h2>
          </div>
        </div>
      </div>

      {/* Searched Result Heading */}
      <div className="mx-5 md:mx-7 xl:mx-10">
        <p className="font-semibold text-xl sm:text-3xl sm:my-2 md:text-4xl xl:text-5xl xl:my-4">{search.charAt(0).toUpperCase() + search.slice(1)}</p>
        <p className="text-[#999999] font-medium text-sm sm:text-base">{`${categoryProducts.length} Products Found`}</p>
      </div>

      {/* Searhed Products */}
      {categoryProducts.length > 0 ? (
        <div className="grid justify-items-center grid-cols-2 w-[97vw] my-8 sm:grid-cols-3 sm:m-3 sm:w-[95vw] sm:mb-20 md:grid-cols-4 md:mx-5 xl:grid-cols-5 xl:mb-40 xl:w-[97vw] xl:my-5">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} url="wishlist"/>
          ))}
        </div>
      ) : (
      // No products
        <div className="flex justify-center my-8 sm:mb-20  min-h-72 max-h-[110vh] ">
          <EmptyState img={NotFound} heading="No Result Found" button="Try Again" subLine="We couldn't find what you searched for."/>
        </div>
      )}

      <Footer />
    </>
  );
}

export default CategoryPage;
