// PropTypes
import PropTypes from "prop-types";

function BillingProduct({ product }) {
  return (
    <div>
        <div className="flex justify-between items-center my-2 w-[93vw] md:w-[320px] lg:w-[380px]">
          <div className="flex items-center">
            <img src={product.images[0]} alt="" className="h-14 w-14 mr-2 object-contain"/>
            <p className="text-xs w-48 sm:text-sm">{product.title}</p>
          </div>
          <p className="text-sm sm:text-base">{`$${product.price}`}</p>
        </div>
    </div>
  );
}

export default BillingProduct;

// Validating prop types
BillingProduct.propTypes = {
  product: PropTypes.object,
}