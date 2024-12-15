// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";

// Hooks and Library
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "@/component/product component/product Details/productDetail";
import ProductImages from "@/component/product component/product Images/productImages";
import SectionHeading from "@/component/home component/Section heading/section";
import ProductCard from "@/component/home component/Product Card/productCard";
import { Context } from "@/context";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {products} = useContext(Context);

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
  if (!product) return <div className="h-screen flex justify-center items-center">
      <p className="text-6xl font-semibold">Loading...</p>
    </div>
  

  return (
    <>
      <HeroSection />
      <NavBar />
      <div className="flex justify-between items-center mt-20 h-[130vh]">
        {/* Product Images */}
        <ProductImages product={product}/>
        {/* Product Details */}
        <ProductDetails product={product}/>
      </div>

      {/* Related Items */}
      <div className="ml-2 h-[80vh]">
        <SectionHeading heading={"Related Item"} />
        {/* Products */}
        <div className="grid grid-cols-5  w-[97vw] my-12 ml-5">
          {products
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map((product) => (
              <ProductCard key={product.id} product={product} url={"wishlist"}/>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
