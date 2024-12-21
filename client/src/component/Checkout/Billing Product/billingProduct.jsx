// PropTypes
import PropTypes from "prop-types";

function BillingProduct({ product }) {
  return (
    <div>
        <div className="flex justify-between items-center my-2 w-[380px]">
          <div className="flex items-center">
            <img src={product.images[0]} alt="" className="h-14 w-14 mr-2 object-contain"/>
            <p className="text-sm w-48">{product.title}</p>
          </div>
          <p>{`$${product.price}`}</p>
        </div>
    </div>
  );
}

export default BillingProduct;

// Validating prop types
BillingProduct.propTypes = {
  product: PropTypes.object,
}