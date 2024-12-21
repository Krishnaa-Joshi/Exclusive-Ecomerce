// PropTypes
import PropTypes from "prop-types";

// Component
import OrderDetails from "../Order Details/orderDetails";
import OrderInfo from "../order info/OrderInfo";

function OrderCard({ order, index, handleCancel,handleViewOrder,handleCloseOrder }) {
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
    <OrderDetails order={order} handleCloseOrder={handleCloseOrder} index={index}/>
  ) : (
    <div className="rounded-lg bg-[#F5F5F5] w-[45vw] my-5">
      {/* Order Status */}
      <div className="p-5">
        {/* Status */}
        <h1 className="font-semibold text-[#808080]">Order Status:</h1>
        <p className="font-bold text-lg">{order.status}</p>
        {/* Unsccessful order */}
        {order.status === "ORDER UNSUCCESSFUL" ? (
          <p className="text-red-600 font-semibold text-sm">
            Sorry, Order Cancel
          </p>
        ) : (
          // Delivery date
          <p className="text-green-600 font-semibold text-sm">{`Estimated delivery: ${formatDate(
            order.deliveryDate
          )} `}</p>
        )}
      </div>

      {/* Products Images */}
      <div className="p-5">
        <div className="flex">
          {order.products.map((product) => (
            <div key={product.id} className="mb-2 bg-white rounded-sm mx-1">
              <img src={product.images[0]} alt="" className="w-20 h-20 object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between p-5 border-t-2 mx-4">
        {/* Order Details */}
        <div>
          <OrderInfo label="Order No.:" value={`#${order.orderNo}`}/>
          <OrderInfo label="Ordered Date:" value={formatDate(order.date)}/>
          <OrderInfo label="Total Price:" value={`$${order.totalPrice}`}/>
        </div>
        

        {/* Action Buttons */}
        <div className="flex flex-col ml-4">
          <button
            className="p-2 border-2 border-[#808080] rounded-md w-44 bg-white font-semibold text-md mb-2"
            onClick={handleView}
          >
            VIEW ORDER
          </button>
          {order.status !== "ORDER UNSUCCESSFUL" ? (
            <button
              className="p-2 border-2 border-[#808080] rounded-md w-44 bg-white font-semibold text-md"
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
