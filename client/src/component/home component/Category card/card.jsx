// Hooks and library
import { Context } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// PropTypes
import PropTypes from "prop-types";

function CateoryCard({ url, title,category }) {
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
        className=" border-[#B3B3B3] border-2 h-[22vh] rounded-md w-[11vw] flex justify-evenly flex-col cursor-pointer"
        onClick={()=>handleCategory(title)}
      >
        <img src={url} className="h-16" alt="" />
        <p className="text-center text-lg font-medium">{title}</p>
      </div>
    </>
  );
}

// Validating prop types
CateoryCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
}

export default CateoryCard;
