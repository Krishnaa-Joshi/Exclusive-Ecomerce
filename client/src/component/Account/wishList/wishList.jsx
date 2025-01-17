// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// Product Component
import ProductCard from "@/component/home component/Product Card/productCard";

function Wishlist(){
    const {wishlistProducts} = useContext(Context);

    return(
        <div className="grid grid-cols-2 justify-items-center mx-4 sm:grid-cols-3 md:grid-cols-4 lg:w-[95vw] lg:mx-8 xl:grid-cols-5 xl:mx-12 2xl:mx-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} url={"trash"} />
          ))}
        </div>
    );
}

export default Wishlist;