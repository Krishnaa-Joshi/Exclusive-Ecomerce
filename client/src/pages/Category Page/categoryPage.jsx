// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";

// Hooks
import { useContext, useState } from "react";
import { Context } from "@/context";

// SVGs 
import Banner from "../../assets/Home assets/banner.svg";
import searchIcon from "../../assets/Home assets/searchIcon.svg";

// Component
import ProductCard from "@/component/home component/Product Card/productCard.jsx";

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
      <div className="m-5 relative h-[145vh]">
        <img src={Banner} alt="" className="w-full" />
        {/* heading */}
        <p className="absolute text-white font-semibold text-7xl top-32 left-52 w-[65vw] text-center">
          Get The Best Products At Your Home
        </p>

        {/* Search bar */}
        <div className="border-2 w-80 rounded-full border-white absolute top-[350px] left-[550px] flex justify-between p-2 backdrop-blur-3xl ">
          <input
            type="text"
            placeholder="Search Products"
            className="bg-transparent p-2 focus:outline-none text-white"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="cursor-pointer" onClick={handleSeachButton}>
            <img src={searchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Categorys */}
        <div className="bg-[#286F6C] text-white p-10 rounded-lg flex justify-around items-center mx-auto max-w-[1100px] relative bottom-52 right-[30px]">
          <div className="text-center cursor-pointer" onClick={()=>fetchProductsByCategory("furniture")}>
            <h2 className="text-4xl font-semibold">Furnitures</h2>
          </div>
          <div className="h-12 border-l border-white"></div>
          <div className="text-center cursor-pointer" onClick={()=>fetchProductsByCategory("groceries")}>
            <h2 className="text-4xl font-semibold">Groceries</h2>
          </div>
          <div className="h-12 border-l border-white"></div>
          <div className="text-center cursor-pointer" onClick={()=>fetchProductsByCategory("fragrances")}>
            <h2 className="text-4xl font-semibold">Perfumes</h2>
          </div>
          <div className="h-12 border-l border-white"></div>
          <div className="text-center cursor-pointer" onClick={()=>fetchProductsByCategory("beauty")}>
            <h2 className="text-4xl font-semibold">Cosmetics</h2>
          </div>
        </div>
      </div>

      {/* Searched Result Heading */}
      <div className="mx-10">
        <p className="text-5xl font-semibold my-4">{search.charAt(0).toUpperCase() + search.slice(1) || "All products"}</p>
        <p className="text-[#999999] font-medium">{`${categoryProducts.length} Products Found`}</p>
      </div>

      {/* Searhed Products */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-5  w-[97vw] my-5 m-5 mb-40">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} url="wishlist"/>
          ))}
        </div>
      ) : (
      // No products
        <div className="flex justify-center items-center text-5xl h-72 ">
          <p>No products Found</p>
        </div>
      )}

      <Footer />
    </>
  );
}

export default CategoryPage;
