// Hooks
import { useState } from "react";

// PropTypes
import PropTypes from "prop-types";

function ProductImages({ product }) {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col-reverse mx-4 sm:flex-row lg:mx-0">
      {/* Side Images */}
      {product.images.length > 1 && (
        <div className="flex mt-6 w-[18vw] h-[15vh] sm:flex-col sm:w-[15vw] sm:mx-5 sm:mt-[15vh] md:h-auto md:mt-[25vh] md:w-[10vw] lg:mt-[30vh] lg:w-[9vw] xl:w-[7vw]">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product thumbnail ${index + 1}`}
              className={`w-full cursor-pointer rounded-sm bg-[#F5F5F5] my-2 mr-3 sm:mr-0 sm:h-[15vh] ${
                img === mainImage ? "border-2 border-black" : ""
              }`} 
              onClick={() => setMainImage(img)} // Change main image
            />
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        className={`flex items-center justify-center overflow-hidden bg-[#F5F5F5] rounded-sm w-full h-[60vh] sm:rounded-md sm:h-[65vh] sm:w-[95vw] md:w-[75vw] md:h-[80vh] lg:w-[45vw] lg:h-[90vh] ${
          product.images.length > 1 ? "sm:my-12 md:mx-5 md:my-14 lg:mx-0" : "my-10 md:m-14"
        }`}
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
