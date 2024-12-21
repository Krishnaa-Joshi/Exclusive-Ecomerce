// PropTypes
import { Context } from "@/context";
import PropTypes from "prop-types";
import { useContext } from "react";

function SummeryCard({ products }) {

  const { totalPrice } = useContext(Context);

  const total = totalPrice(products);

  return (
    <div>
      {/* SubTotal */}
      <div className="flex font-medium justify-between  my-2.5 border-b-2 border-b-[#999999] p-2.5">
        <p>Subtotal</p>
        <p>{`$${total.toFixed(2)}`}</p>
      </div>
      {/* Shipping */}
      <div className="flex font-medium justify-between  my-2.5 border-b-2 border-b-[#999999] p-2.5">
        <p>Shipping</p>
        <p className="text-green-500">Free</p>
      </div>
      {/* Grand Total */}
      <div className="flex font-medium justify-between p-2.5 my-2.5">
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
