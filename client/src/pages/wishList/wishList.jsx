// Main component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";

// Component
import ProductCard from "@/component/home component/Product Card/productCard.jsx";
import WishList from "@/component/Account/wishList/wishList";

// Hooks
import { Context } from "@/context";
import { useContext, useMemo } from "react";
import SectionHeading from "@/component/home component/Section heading/section";

function WishListPage() {
  const { products, wishlistProducts, setWhishlistProducts, setCartProducts } = useContext(Context);

  const quantity = wishlistProducts.length;

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

  const shuffledProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [products]);

  return (
    <>
      <HeroSection />
      <NavBar />
      <div></div>
      <div className="flex justify-between mx-24 items-center h-44">
        <div className="font-medium text-lg">
          <h1>Wishlist {`( ${quantity} )`}</h1>
        </div>
        <button className="p-3 border-2 border-[#808080] rounded-md font-medium w-44" onClick={()=>handleMoveToBag()}>
          Move All To Bag
        </button>
      </div>
      {quantity > 0 ? (
        <div className="grid grid-cols-5 w-[88vw] mx-20">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} url={"trash"} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <WishList />
        </div>
      )}
      <div className="flex justify-between mx-[70px] items-center h-44">
        <SectionHeading heading={"Just For You"} />
        <button className="p-3 border-2 border-[#808080] rounded-md font-medium w-36">
          See All
        </button>
      </div>
      <div className="grid grid-cols-5 w-[90vw] mx-20 mb-44">
        {shuffledProducts.map((product) => (
          <ProductCard key={product.id} product={product} url={"wishlist"} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default WishListPage;
