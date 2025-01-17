// Main component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";

// Component
import ProductCard from "@/component/home component/Product Card/productCard.jsx";
import SectionHeading from "@/component/home component/Section heading/section";
import Wishlist from "@/component/Account/wishList/wishlist";
import EmptyState from "@/component/Account/Empty State/emptyState";

// Hooks
import { Context } from "@/context";
import { Children, useContext} from "react";

// SVGs
import EmptywishlistImg from "../../assets/Account assets/wishlist/emptyWishlist.svg"
import { useNavigate } from "react-router-dom";

function WishListPage() {
  const { products, wishlistProducts, setWhishlistProducts, setCartProducts,setCategoryProducts,setSearch,shuffledProducts } = useContext(Context);
  const navigate = useNavigate();
  const quantity = wishlistProducts.length;

  //Handle Move to Bag Button
  const handleMoveToBag = () => {
    setCartProducts((prev) => {
      const newProducts = wishlistProducts.filter(
        (wishlistProduct) => !prev.some((cartProduct) => cartProduct.id === wishlistProduct.id)
      );
      const productsWithQuantity = newProducts.map((product) => ({
        ...product,
        quantity: 1,
      }));
      return [...prev, ...productsWithQuantity];
    });
  
    // Clear wishlistProducts
    setWhishlistProducts([]);
  };

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
      <div className="flex justify-between items-center h-24 mx-3 sm:h-32 sm:mx-4 md:h-40 lg:h-44 xl:mx-7">
        {/* Display Quantity */}
        <div className="font-medium text-sm ml-2 sm:text-base md:text-lg md:ml-3 lg:ml-7 xl:ml-8">
          <h1>Wishlist {`( ${quantity} )`}</h1>
        </div>
        {/* Move to bag */}
        <button className="border-2 border-[#808080] font-medium text-sm p-2 rounded-sm sm:w-36 md:rounded-md md:text-base md:w-40 xl:p-3 xl:w-44" onClick={()=>handleMoveToBag()}>
          Move All To Bag
        </button>
      </div>

      {quantity > 0 ? (
        // Show Wishlsit Products
        <Wishlist/>
      ) : (
        // Empty Wishlist
        <div className="flex justify-center">
          <EmptyState img={EmptywishlistImg} heading={"Your wishList is empty!"} subLine={"Explore more and shortList some items"}/>
        </div>
      )}

      {/* Just for you Section */}
      <div className="flex justify-between items-center h-24 mx-3 sm:h-32 sm:mx-4 md:h-40 lg:h-44  xl:mx-7">
        <SectionHeading heading={"Just For You"} />
        {/* Button */}
        <button className="border-2 border-[#808080] font-medium items-center text-sm p-2 w-24 rounded-sm md:text-base md:rounded-md md:w-32 xl:w-36" onClick={handleViewAllProducts}>
          See All
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-2 mx-4 mb-20 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:w-[95vw] lg:mx-8 xl:grid-cols-5 xl:mx-12 xl:mb-44 2xl:mx-8">
        {Children.toArray(
          shuffledProducts.map((product) => (
            <ProductCard product={product} url={"wishlist"} />
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default WishListPage;
