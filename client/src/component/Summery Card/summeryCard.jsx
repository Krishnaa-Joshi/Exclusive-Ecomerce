import { Context } from "@/context";
import { useContext } from "react";

function SummeryCard() {
    const {cartProducts} = useContext(Context);

    // Calculate Total Price
    const totalPrice = cartProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

  return (
    <div>
      {/* SubTotal */}
      <div className="flex font-medium justify-between p-2.5 my-2.5 border-b-2 border-b-[#999999]">
        <p>Subtotal: </p>
        <p>{`$${totalPrice.toFixed(2)}`}</p>
      </div>
      {/* Shipping */}
      <div className="flex font-medium justify-between p-2.5 my-2.5 border-b-2 border-b-[#999999]">
        <p>Shipping: </p>
        <p className="text-green-600">Free</p>
      </div>
      {/* Grand Total */}
      <div className="flex font-medium justify-between p-2.5 my-2.5">
        <p>Total: </p>
        <p>{`$${totalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  );
}

export default SummeryCard;
