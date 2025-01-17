// PropTypes
import PropTypes from "prop-types";

// Component
import OrderDetails from "../Order Details/orderDetails";
import OrderInfo from "../order info/OrderInfo";

function OrderCard({
  order,
  index,
  handleCancel,
  handleViewOrder,
  handleCloseOrder,
}) {
  // Utility function to format the date
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  // Cancel Button
  const handleCancelButton = () => {
    handleCancel(index);
  };

  // View order button
  const handleView = () => {
    handleViewOrder(index);
  };

  return order.viewOrder ? (
    // Order Details Component
    <OrderDetails
      order={order}
      handleCloseOrder={handleCloseOrder}
      index={index}
    />
  ) : (
    <div className="rounded-lg bg-[#F5F5F5] w-[95vw]  my-3 md:my-5 md:w-[65vw] lg:w-[45vw]">
      {/* Order Status */}
      <div className="p-3 sm:p-5">
        {/* Status */}
        <h1 className="font-semibold text-[#808080] text-sm sm:text-base">
          Order Status:
        </h1>
        <p className="font-bold text-base sm:text-lg">{order.status}</p>
        {/* Unsccessful order */}
        {order.status === "ORDER UNSUCCESSFUL" ? (
          <p className="text-red-600 font-semibold text-xs sm:text-sm">
            Sorry, Order Cancel
          </p>
        ) : (
          // Delivery date
          <p className="text-green-600 font-semibold text-xs sm:text-sm">{`Estimated delivery: ${formatDate(
            order.deliveryDate
          )} `}</p>
        )}
      </div>

      {/* Products Images */}
      <div className="p-3 sm:p-5">
        <div className="flex">
          {order.products.map((product) => (
            <div key={product.id} className="mb-2 bg-white rounded-sm mx-1">
              <img
                src={product.images[0]}
                alt=""
                className="w-14 h-14 object-contain sm:w-20 sm:h-20"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="justify-between border-t-2 px-1.5 py-3 mx-2 sm:flex sm:p-5 sm:mx-4">
        {/* Order Details */}
        <div className="mb-3 sm:mb-0">
          <OrderInfo label="Order No.:" value={`#${order.orderNo}`} />
          <OrderInfo label="Ordered Date:" value={formatDate(order.date)} />
          <OrderInfo label="Total Price:" value={`$${order.totalPrice}`} />
        </div>

        {/* Action Buttons */}
        <div className="ml-1 flex justify-between sm:flex-col sm:ml-4">
          <button
            className="bg-white font-semibold border-2 border-[#808080] rounded-md w-32 p-1.5 text-sm sm:p-2 sm:w-44 sm:mb-2"
            onClick={handleView}
          >
            VIEW ORDER
          </button>
          {order.status !== "ORDER UNSUCCESSFUL" ? (
            <button
              className="border-2 border-[#808080] rounded-md bg-white font-semibold w-32 p-1.5 text-sm sm:w-44 sm:p-2"
              onClick={handleCancelButton}
            >
              CANCEL ORDER
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Props validation
OrderCard.propTypes = {
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
  index: PropTypes.number.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleViewOrder: PropTypes.func.isRequired,
  handleCloseOrder: PropTypes.func.isRequired,
};

export default OrderCard;
