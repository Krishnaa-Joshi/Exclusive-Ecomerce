// PropTypes
import PropTypes from "prop-types";

function AboutCard({
  // Props
  figure,
  detail,
  box = true,
  color = "",
  bgColor = "",
  pathSrc,
  width = "",
  fontSize = "",
  fontWeight = "",
  height = "",
}) {
  return (
    <div
      className={`flex flex-col justify-center items-center rounded-sm m-1.5 sm:m-2.5 ${
        width === "" ? "w-[46vw] md:w-[22vw] xl:w-[17vw]" : width
      } ${height === "" ? "h-[30vh] " : height} ${
        box ? "border-2 border-[#B3B3B3]" : ""
      } ${bgColor === "" ? "" : bgColor}`}
    >
      <div className="rounded-full flex justify-evenly items-center w-[18vw] sm:w-[10vw] md:w-auto">
        <img src={pathSrc} alt="" />
      </div>
      <div
        className={`flex flex-col justify-center items-center my-1 sm:justify-evenly sm:h-[10vh] ${
          color === "" ? "" : color
        }`}
      >
        <p
          className={`text-center ${
            fontWeight === "" ? "font-bold" : fontWeight
          } ${fontSize === "" ? "text-3xl md:text-4xl" : fontSize}`}
        >
          {figure}
        </p>
        <p
          className={`text-sm mx-2 text-center sm:text-base md:mx-0 ${
            fontWeight === "" ? "font-medium" : ""
          } ${fontSize === "" ? "" : "text-sm"}`}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

// Validating prop types
AboutCard.propTypes = {
  figure: PropTypes.string,
  detail: PropTypes.string,
  box: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  pathSrc: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  height: PropTypes.string,
};

export default AboutCard;
