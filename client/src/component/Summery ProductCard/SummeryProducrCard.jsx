// Hooks
import { useContext } from "react";
import { Context } from "@/context";

// PropTypes
import PropTypes from "prop-types";

function SummaryProductCard({ product }) {
  const { cartProducts } = useContext(Context);

  return (
    <>
      <div className="flex items-center justify-between w-11/12 border-b-2 py-2">
        <div className="flex items-center">
          <div className="">
            <img src={product.images[0]} alt="" className="w-20" />
          </div>
          <div>
            <p>{product.title}</p>
            <p>{`Quantity : ${
              cartProducts.find((item) => item.id === product.id)?.quantity
            }`}</p>
          </div>
        </div>
        <p className="font-semibold w-16">{`$${product.price}`}</p>
      </div>
    </>
  );
}

// Validating prop types
SummaryProductCard.propTypes = {
  product: PropTypes.object,
}

export default SummaryProductCard;
