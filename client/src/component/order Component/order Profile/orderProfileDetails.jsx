// PropTypes
import PropTypes from "prop-types"

function OrderProfileDetails({label,value,extra=""}) {
  return (
    <div className="flex font-medium justify-between w-64 my-2">
      <p className="">{label}</p>
      <p className={`text-[#808080] text-start ${label === "Address" ? extra : "w-28"}`}>{value}</p>
    </div>
  );
}

export default OrderProfileDetails;

OrderProfileDetails.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    extra: PropTypes.string,
}