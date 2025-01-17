// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";

// Hooks and Library
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/context";

// component
import ProductDetails from "@/component/product component/product Details/productDetail";
import ProductImages from "@/component/product component/product Images/productImages";
import SectionHeading from "@/component/home component/Section heading/section";
import ProductCard from "@/component/home component/Product Card/productCard";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { products ,sliceCount} = useContext(Context);

  // Fetch Product from id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading State
  if (!product)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-base font-semibold sm:text-lg md:text-6xl">Loading...</p>
      </div>
    );

  return (
    <>
      <HeroSection />
      <NavBar />
      <div className="flex flex-col mt-5 md:mt-10 lg:items-center lg:justify-between lg:flex-row lg:h-[120vh] xl:h-[130vh] xl:mt-20">
        {/* Product Images */}
        <ProductImages product={product} />
        {/* Product Details */}
        <ProductDetails product={product} />
      </div>

      {/* Related Items */}
      <div className="ml-2 mb-20 sm:mb-20 sm:mt-10 sm:ml-4 lg:ml-0 lg:mt-0 lg:mb-0 lg:h-[80vh]">
        <SectionHeading heading={"Related Item"} />
        {/* Products */}
        <div className="grid grid-cols-2 justify-items-center w-[95vw] my-7 sm:grid-cols-3 sm:ml-2 md:grid-cols-4 lg:ml-5 lg:w-[97vw] lg:my-10 xl:my-12 xl:grid-cols-5">
          {products.slice(0, sliceCount[0]).map((product) => (
            <ProductCard key={product.id} product={product} url="wishlist"/>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
