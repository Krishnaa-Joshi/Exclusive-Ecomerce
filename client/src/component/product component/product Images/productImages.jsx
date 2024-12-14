// Hooks
import { useState } from "react";

// PropTypes
import PropTypes from "prop-types";

function ProductImages({ product }) {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="flex">
      {/* Side Images */}
      {product.images.length > 1 && (
        <div className="w-40 flex flex-col mx-10 mt-12">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product thumbnail ${index + 1}`}
              className={`w-full cursor-pointer bg-[#F5F5F5] my-2 rounded-sm ${
                img === mainImage ? "border-2 border-black" : ""
              }`} 
              onClick={() => setMainImage(img)} // Change main image
            />
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        className={`w-[45vw] h-[45vw] ${
          product.images.length > 1 ? "my-14" : "m-14"
        } rounded-md bg-[#F5F5F5] flex items-center justify-center overflow-hidden`}
      >
        <img
          src={mainImage}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

// Validating prop types
ProductImages.propTypes = {
  product: PropTypes.object,
}

export default ProductImages;
