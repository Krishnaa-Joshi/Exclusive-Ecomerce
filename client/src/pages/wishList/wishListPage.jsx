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
import { Children, useContext, useMemo } from "react";

// SVGs
import EmptywishlistImg from "../../assets/Account assets/wishlist/emptyWishlist.svg"
import { useNavigate } from "react-router-dom";

function WishListPage() {
  const { products, wishlistProducts, setWhishlistProducts, setCartProducts,setCategoryProducts,setSearch } = useContext(Context);
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

  // suffled Products
  const shuffledProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [products]);

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
      <div></div>
      <div className="flex justify-between mx-24 items-center h-44">
        {/* Display Quantity */}
        <div className="font-medium text-lg">
          <h1>Wishlist {`( ${quantity} )`}</h1>
        </div>
        {/* Move to bag */}
        <button className="p-3 border-2 border-[#808080] rounded-md font-medium w-44" onClick={()=>handleMoveToBag()}>
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
      <div className="flex justify-between mx-[70px] items-center h-44">
        <SectionHeading heading={"Just For You"} />
        {/* Button */}
        <button className="p-3 border-2 border-[#808080] rounded-md font-medium w-36" onClick={handleViewAllProducts}>
          See All
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-5 w-[90vw] mx-20 mb-44">
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
