// Hooks
import { Context } from "@/context";
import { Children, useContext } from "react";

// Cart Products
import CartProduct from "../cart Product/cartProduct";
import CartMobile from "../mobile cart product/Cartmobile";

function DisplayCartProducts() {
  const { cartProducts } = useContext(Context);

  return (
    <>
      <div className="hidden sm:block">
        {Children.toArray(
          cartProducts.map((product) => <CartProduct product={product} />)
        )}
      </div>
      <div className="sm:hidden">
        {Children.toArray(
          cartProducts.map((product) => <CartMobile product={product} />)
        )}
      </div>
    </>
  );
}

export default DisplayCartProducts;
