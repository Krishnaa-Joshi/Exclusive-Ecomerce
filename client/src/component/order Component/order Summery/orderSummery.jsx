// PropTypes
import PropTypes from "prop-types";

function OrderSummeryCard({ label, value,extra="" }) {
  return (
    <div className={`flex font-medium justify-between ${extra}`}>
      <p>{label}</p>
      <p className="text-[#808080]">{value}</p>
    </div>
  );
}

export default OrderSummeryCard;

// Prop Validation
OrderSummeryCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  extra: PropTypes.string,
};
