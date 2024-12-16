// Hooks
import { Context } from "@/context";
import { Children, useContext } from "react";

// Cart Products
import CartProduct from "../cart Product/cartProduct";

function DisplayCartProducts() {
  const { cartProducts } = useContext(Context);

  return (
    <div>
      {Children.toArray(
        cartProducts.map((product) => <CartProduct product={product} />)
      )}
    </div>
  );
}

export default DisplayCartProducts;
