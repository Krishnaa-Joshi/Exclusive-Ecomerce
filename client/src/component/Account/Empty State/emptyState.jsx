// Hooks
import { useNavigate } from "react-router-dom";
import { Context } from "@/context";
import { useContext } from "react";

// PropTypes
import PropTypes from "prop-types";

// Component
import Button from "@/component/Button/Button";

function EmptyState({ img, heading, subLine, button = "Shop Now" }) {
  const navigate = useNavigate();
  const { setAddAddress, section, currentPage } = useContext(Context);

  // navigate to Home Page
  const handleButton = () => {
    if (section === "Address") setAddAddress(true);
    else if (currentPage === "category") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else navigate("/");
  };

  return (
    <div
      className={`xl:mt-16 ${
        currentPage === "cart" ? "w-full xl:h-[80vh]" : "w-full lg:w-[58vw]"
      }`}
    >
      <div className="flex justify-center items-center flex-col">
        <img
          src={img}
          alt="empty box"
          className="h-40 sm:h-48 md:h-52 lg:h-56 xl:h-64"
        />
        <h1 className="text-lg mb-2 sm:text-xl md:text-2xl lg:text-3xl">
          {heading}
        </h1>{" "}
        {/* heading */}
        <p className="text-[#808080] text-xs sm:text-sm md:text-base">
          {subLine}
        </p>{" "}
        {/* SubLine */}
        <Button
          handleFunc={handleButton}
          padding="p-1 md:p-3"
          width="w-28 sm:w-36 md:w-40 lg:w-44"
          rounded="rounded-sm lg:rounded-md"
          otherStyle="my-4"
          title={button}
        />{" "}
        {/* Button */}
      </div>
    </div>
  );
}

export default EmptyState;

EmptyState.propTypes = {
  img: PropTypes.string,
  heading: PropTypes.string,
  subLine: PropTypes.string,
  button: PropTypes.string,
};
