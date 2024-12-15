// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// Cart Products
import CartProduct from "../cart Product/cartProduct";

function DisplayCartProducts() {
  const { cartProducts } = useContext(Context);

  return (
    <div>
      {cartProducts.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default DisplayCartProducts;
