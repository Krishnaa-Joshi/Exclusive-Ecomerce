// SVGs
import Linkedin from "../../../assets/About assets/Investor Card/linkedin.svg"
import Instagram from "../../../assets/About assets/Investor Card/instagram.svg"
import Twitter from "../../../assets/About assets/Investor Card/X.svg"

// PropTypes
import PropTypes from 'prop-types';

function InvestorCard({srcPath,name,detail,width = "100%"}) {
  return (
    <div className="w-1/5 mx-5"  >
      <div className="bg-[#F5F5F5] rounded-lg flex justify-center items-end h-[70%]">
        <img src={srcPath} alt="person" style={{width: width}}/>
      </div>
      <h2 className="text-4xl font-medium mt-2.5">{name}</h2>
      <p className="text-base">{detail}</p>
      {/* Social Media Link */}
      <div className="w-[7%] flex my-2.5">
        <img src={Twitter} alt="" className="mr-3" />
        <img src={Instagram} alt="" className="mr-3" />
        <img src={Linkedin} alt=""  />
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
}

export default InvestorCard;
