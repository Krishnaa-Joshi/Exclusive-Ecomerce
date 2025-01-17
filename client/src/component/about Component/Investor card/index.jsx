// SVGs
import Linkedin from "../../../assets/About assets/Investor Card/linkedin.svg";
import Instagram from "../../../assets/About assets/Investor Card/instagram.svg";
import Twitter from "../../../assets/About assets/Investor Card/X.svg";

// PropTypes
import PropTypes from "prop-types";

function InvestorCard({ srcPath, name, detail, width = "" }) {
  return (
    <div className="w-[43vw] mx-3 sm:mx-5 sm:w-[27vw] md:w-[28vw] lg:w-[26vw] xl:w-[22vw]">
      {/* Image */}
      <div
        className="bg-[#F5F5F5] rounded-lg flex justify-center items-end min-h-[20vh] object-cover sm:min-h-[38vh] md:min-h-[43vh] lg:min-h-[20vh] xl:min-h-[58vh]"
      >
        <img src={srcPath} alt="person" className={`${width}`} />
      </div>
      {/* Name */}
      <h2 className="text-xl font-medium mt-2.5 sm:text-2xl md:text-3xl lg:text-4xl">
        {name}
      </h2>
      {/* Role */}
      <p className="text-sm sm:text-base">{detail}</p>
      {/* Social Media Link */}
      <div className="flex my-2.5 w-[4vw] sm:w-[3vw] md:w-[7%]">
        <img src={Twitter} alt="" className="mr-3" />
        <img src={Instagram} alt="" className="mr-3" />
        <img src={Linkedin} alt="" className="" />
      </div>
    </div>
  );
}

// Validating prop types
InvestorCard.propTypes = {
  srcPath: PropTypes.string,
  name: PropTypes.string,
  detail: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default InvestorCard;
