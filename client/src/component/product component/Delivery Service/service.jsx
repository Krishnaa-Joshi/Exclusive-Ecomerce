// PropTypes
import PropTypes from "prop-types";

function DeliveryService({ img, heading, description }) {
  return (
    <div className="flex p-4">
      <img src={img} alt="img" />
      <div className="mx-4">
        <p className="font-semibold text-lg">{heading}</p>
        <p className="text-xs font-medium border-b-[1px] border-b-black">
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