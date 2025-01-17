// PropTypes
import PropTypes from "prop-types";

// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function SummeryCard({ products }) {

  const { totalPrice } = useContext(Context);

  const total = totalPrice(products);

  return (
    <div>
      {/* SubTotal */}
      <div className="flex font-medium justify-between border-b-2 border-b-[#999999] my-2.5 p-2.5 text-sm sm:my-2 sm:p-2 md:text-base md:my-2.5 md:p-2.5">
        <p>Subtotal</p>
        <p>{`$${total.toFixed(2)}`}</p>
      </div>
      {/* Shipping */}
      <div className="flex font-medium justify-between border-b-2 border-b-[#999999] my-2.5 p-2.5 text-sm sm:my-2 sm:p-2 md:text-base md:my-2.5 md:p-2.5">
        <p>Shipping</p>
        <p className="text-green-500">Free</p>
      </div>
      {/* Grand Total */}
      <div className="flex font-medium justify-between my-2.5 p-2.5 text-sm sm:my-2 sm:p-2 md:text-base md:my-2.5 md:p-2.5">
        <p>Total: </p>
        <p>{`$${total.toFixed(2)}`}</p>
      </div>
    </div>
  );
}

SummeryCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired, 
      quantity: PropTypes.number.isRequired, 
    })
  ).isRequired, 
};

export default SummeryCard;
