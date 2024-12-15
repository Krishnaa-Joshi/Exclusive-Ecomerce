// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// Product Component
import ProductCard from "@/component/home component/Product Card/productCard";

function Wishlist(){
    const {wishlistProducts} = useContext(Context);

    return(
        <div className="grid grid-cols-5 w-[88vw] mx-20">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} url={"trash"} />
          ))}
        </div>
    );
}

export default Wishlist;