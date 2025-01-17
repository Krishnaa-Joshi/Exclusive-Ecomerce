// PropTypes
import PropTypes from "prop-types";

function SummaryProductCard({ product }) {
  
  return (
    <>
      <div className="flex items-center justify-between border-b-2 py-1 w-[70vw] sm:py-2 md:w-11/12">
        <div className="flex items-center">
          <div className="">
            <img src={product.images[0]} alt="" className="w-20" />
          </div>
          <div>
            <p>{product.title}</p>
            <p>{`Quantity : ${product?.quantity}`}</p>
          </div>
        </div>
        <p className="font-semibold w-14 sm:w-16">{`$${product.price}`}</p>
      </div>
    </>
  );
}

// Validating prop types
SummaryProductCard.propTypes = {
  product: PropTypes.object,
}

export default SummaryProductCard;
