// PropTypes
import PropTypes from "prop-types";

function ContactInfo({img ,heading,service,contactDetail}) {
  return (
    <>
       <div className="flex items-center my-1.5 sm:my-3">
        <img src={img} alt="" className="w-8 sm:w-9 lg:w-auto"/>
        <p className="text-lg mx-2 font-medium sm:mx-1 sm:text-xl sm:font-semibold md:mx-2 lg:mx-4 xl:mt-1.5">{heading}</p>
      </div>
      <p className="text-sm mx-1.5 my-1.5 sm:mx-2 xl:mx-0">{service}</p>
      <p className="text-sm mx-1.5 my-1.5 sm:mx-2 xl:mx-0">{contactDetail}</p>
    </>
  );
}

export default ContactInfo;

// Props Validation
ContactInfo.propTypes = {
    img: PropTypes.string,
    heading: PropTypes.string,
    service: PropTypes.string,
    contactDetail: PropTypes.string,
}
