// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// PropTypes
import PropTypes from "prop-types";

// SVGs
import cross from "../../../assets/Ordered placed/x.svg";
import OrderSummeryCard from "../order Summery/orderSummery";

function OrderDetails({ order, handleCloseOrder, index }) {
  const { profileData } = useContext(Context);

  // Close Button
  const CloseButton = () => {
    console.log("Clicked");
    handleCloseOrder(index);
  };

  

  return (
    <>
      <div className="w-[63vw] bg-[#F5F5F5] p-5 absolute left-0 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
        {/* Back To My Orders Section */}
        <div
          className="flex justify-end w-[97%] cursor-pointer"
          onClick={CloseButton}
        >
          <img src={cross} alt="" />
        </div>

        {/* heading */}
        <div className="text-2xl font-semibold ">
          <h1>Order Detail</h1>
        </div>

        {/* Order No */}
        <div className="flex font-semibold text-lg my-10">
          <p className="mr-2">Order Number</p>
          <p>#{order.orderNo}</p>
        </div>

        {/* Products */}
        <div className="border-2 border-[#808080] rounded-md my-5 w-[97%]">
          {order.products.map((product, index) => (
            <div key={product.id}>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                  {/* Product img */}
                  <div className="bg-white rounded-md mr-2">
                    <img src={product.images[0]} alt="" className="object-contain w-16 h-16" />
                  </div>
                  {/* Product Name */}
                  <p className="font-medium">{product.title}</p>
                </div>

                {/* Price and quantity */}
                <div>
                  <p className="font-semibold text-lg">${product.price}</p>
                  <p className="text-sm text-[#808080] font-medium">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
              {index !== order.products.length - 1 && (
                <div className="border-b-2 border-[#808080]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Order Summery */}
        <OrderSummeryCard order={order}/>

        {/* Customer Details */}
        <div className="mt-10">
          <p className="font-semibold text-xl">Customer Details</p>
        </div>
        <div className="flex justify-between w-[80%] my-5">
          <div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p className="">Name</p>
              <p className="text-[#808080] text-start w-28">
                {profileData?.name}
              </p>
            </div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p>Email</p>
              <p className="text-[#808080] text-start w-28">
                {profileData?.email}
              </p>
            </div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p>Mobile</p>
              <p className="text-[#808080] text-start w-28">
                {profileData?.phone}
              </p>
            </div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p>State</p>
              <p className="text-[#808080] text-start w-28">
                {profileData?.address?.state}
              </p>
            </div>
          </div>
          <div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p>City</p>
              <p className="text-[#808080] text-start w-28">
                {profileData?.address?.city}
              </p>
            </div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p>Address</p>
              <p className="text-[#808080] text-start w-40 relative left-12">
                {profileData?.address?.street}
              </p>
            </div>
            <div className="flex font-medium justify-between w-64 my-2">
              <p>Pin Code</p>
              <p className="text-[#808080] text-start w-28">
                {profileData?.address?.zip}
              </p>
            </div>
            <div className="flex font-medium justify-between items-center h-6 w-52 my-2">
              <p>Status</p>
              <p
                className={`${
                  order.status === "IT'S ORDERED!"
                    ? "text-green-500 bg-green-200"
                    : "text-red-500 bg-red-200"
                } p-1 text-center rounded-sm w-16 h-8`}
              >
                {order.status === "IT'S ORDERED!" ? "Paid" : "Cancel"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  order: PropTypes.shape({
    status: PropTypes.string.isRequired,
    deliveryDate: PropTypes.string.isRequired,
    viewOrder: PropTypes.bool.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
    orderNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    date: PropTypes.string.isRequired,
    totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  handleCloseOrder: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
