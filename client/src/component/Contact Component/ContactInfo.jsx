// PropTypes
import PropTypes from "prop-types";

function ContactInfo({img ,heading,service,contactDetail}) {
  return (
    <>
      <div className="flex my-3">
        <img src={img} alt="" />
        <p className="mt-1 text-xl mx-4 font-semibold ">{heading}</p>
      </div>
      <p className="my-3 ">{service}</p>
      <p className="my-3 ">{contactDetail}</p>
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
