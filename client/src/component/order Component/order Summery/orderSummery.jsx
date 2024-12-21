// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// PropTypes
import PropTypes from "prop-types";

function OrderSummeryCard({order}){
    const {totalPrice} = useContext(Context);

    // Calculate Total Price
    const total = totalPrice(order.products);

    return(
        <div className="my-5 w-48 relative left-[75%]">
          {/* SubTotal */}
          <div className="flex font-medium justify-between">
            <p>Subtotal</p>
            <p className="text-[#808080]">{`$${total.toFixed(2)}`}</p>
          </div>
          {/* Shipping */}
          <div className="flex font-medium justify-between border-b-2 border-b-[#999999] py-2">
            <p>Shipping</p>
            <p className="text-[#808080]">Free</p>
          </div>
          {/* Grand Total */}
          <div className="flex font-medium justify-between my-2.5">
            <p>Total</p>
            <p className="text-[#808080]">{`$${total.toFixed(2)}`}</p>
          </div>
        </div>
    );
}

export default OrderSummeryCard;

// Prop Validation
OrderSummeryCard.propTypes = {
    order : PropTypes.shape({
        products: PropTypes.array,
    }),
}