// PropTypes
import PropTypes from "prop-types";

function OrderInfo({label,value}){
    return(
        <div className="flex">
            <p className="font-medium text-[#808080] mr-2 text-sm sm:text-base">{label}</p>
            <p className="font-medium text-sm sm:text-base">{value}</p>
        </div>
    );
}

export default OrderInfo;

// Props validation
OrderInfo.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
}