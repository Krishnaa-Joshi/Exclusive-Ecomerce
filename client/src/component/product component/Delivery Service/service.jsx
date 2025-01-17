// PropTypes
import PropTypes from "prop-types";

function DeliveryService({ img, heading, description }) {
  return (
    <div className="flex p-2 sm:p-4">
      <img src={img} alt="img"/>
      <div className="mx-2 sm:mx-4">
        <p className="font-semibold text-base sm:text-lg">{heading}</p>
        <p className="font-medium border-b-[1px] border-b-black text-xs">
          {description}
        </p>
      </div>
    </div>
  );
}

export default DeliveryService;

// Props Validation 
DeliveryService.propTypes ={
    img:  PropTypes.string,
    heading:  PropTypes.string,
    description:  PropTypes.string
}