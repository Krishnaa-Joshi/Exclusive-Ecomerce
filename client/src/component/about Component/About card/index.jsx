// PropTypes
import PropTypes from "prop-types";

function AboutCard({
  figure,
  detail,
  color1 = "#C1C0C1",
  color2 = "black",
  box = true,
  bgColor = "",
  pathSrc,
  fontSize = "2.5rem",
  fontWeight = "500",
  mBottom = true,
  width = "18%",
}) {
  return (
    <div
      style={{ backgroundColor: bgColor, width: width }}
      className={` ${
        box ? "border-2 border-[#B3B3B3]" : ""
      }  flex flex-col justify-center items-center  h-[30vh] rounded-sm m-2.5`}
    >
      <div
        style={{ backgroundColor: color1 }}
        className="w-[85px] h-[85px] rounded-full flex justify-center items-center"
      >
        <div
          style={{ backgroundColor: color2 }}
          className="h-[63px] w-[63px] flex justify-center rounded-full"
        >
          <img src={pathSrc} alt="" className={` max-w-11`} />
        </div>
      </div>

      <h1
        style={{ color: color2, fontSize: fontSize }}
        className={`font-bold text-4xl ${mBottom ? "mb-2.5" : ""} mt-2.5"`}
      >
        {figure}
      </h1>
      <p style={{ color: color2, fontWeight: fontWeight }}>{detail}</p>
    </div>
  );
}

// Validating prop types
AboutCard.propTypes = {
  figure: PropTypes.string,
  detail: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
  box: PropTypes.bool,
  bgColor: PropTypes.string,
  pathSrc: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  mBottom: PropTypes.bool,
  width: PropTypes.string,
};

export default AboutCard;
