// PropTypes
import PropTypes from "prop-types"

function OrderProfileDetails({label,value,extra=""}) {
  return (
    <div className="flex font-medium justify-between w-52 my-2 sm:w-56 md:w-64 lg:w-56 xl:w-64">
      <p className="text-sm sm:text-base ">{label}</p>
      <p className={`text-[#808080] text-start text-sm sm:text-base ${label === "Address" ? extra : "w-28"}`}>{value}</p>
    </div>
  );
}

export default OrderProfileDetails;

OrderProfileDetails.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    extra: PropTypes.string,
}