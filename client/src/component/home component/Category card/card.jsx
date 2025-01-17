// Hooks and library
import { Context } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// PropTypes
import PropTypes from "prop-types";

function CateoryCard({ url, title, category }) {
  const navigate = useNavigate();
  const { fetchProductsByCategory } = useContext(Context);

  // Fetch Category Product and Navigate to Category Page
  const handleCategory = () => {
    fetchProductsByCategory(category);
    navigate("/category");
  };

  return (
    <>
      <div
        className=" border-[#B3B3B3] border-2 h-[20vh] w-[40vw] m-1.5 rounded-md flex justify-evenly flex-col cursor-pointer sm:h-[23vh] sm:w-[25vw] md:h-[24vh] md:w-[20vw] lg:h-[26vh] lg:w-[18vw] lg:m-0 xl:h-[22vh] xl:w-[11vw]"
        onClick={() => handleCategory(title)}
      >
        <img src={url} className="h-[7vh] sm:h-[9vh] lg:h-16" alt="" />
        <p className="text-center font-medium sm:text-lg">{title}</p>
      </div>
    </>
  );
}

// Validating prop types
CateoryCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
};

export default CateoryCard;
