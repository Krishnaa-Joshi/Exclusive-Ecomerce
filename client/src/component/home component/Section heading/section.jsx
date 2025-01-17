// PropTypes
import PropTypes from "prop-types";

function SectionHeading({heading}) {
  return (
    <div className="flex items-center lg:items-start">
      <div className="bg-red-500 w-3 h-7 ml-2 rounded-sm lg:w-4 lg:h-8 lg:ml-7 xl:w-5"></div>
      <p className="text-red-500 text-base ml-2 font-semibold sm:text-lg md:text-xl lg:mt-0.5 xl:text-lg">{heading}</p>
    </div>
  );
}

export default SectionHeading;

// Props Validation
SectionHeading.propTypes = {
  heading: PropTypes.string,
}
