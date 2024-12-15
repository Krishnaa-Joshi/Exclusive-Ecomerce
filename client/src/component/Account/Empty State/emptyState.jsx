// Hooks
import { useNavigate } from "react-router-dom";
import { Context } from "@/context";
import { useContext } from "react";

// PropTypes
import PropTypes from "prop-types";
import Button from "@/component/Button/Button";

function EmptyState({ img,heading,subLine,button = "Shop Now" }) {

    const navigate = useNavigate();
    const { setAddAddress,section,currentPage } = useContext(Context)
      
    // navigate to Home Page
    const handleButton = ()=>{
        if(section === "Address")
            setAddAddress(true);
        else
            navigate("/");
    }
    
  return (
    <div className={`mt-16 ${currentPage === 'cart' ? "w-full h-[80vh]" : "w-[58vw]"}`}>
      <div className="flex justify-center items-center flex-col">
        <img src={img} alt="empty box" className="h-64" />
        <h1 className="text-3xl mb-2">{heading}</h1>
        <p className="text-[#808080]">
          {subLine}
        </p>
        <Button handleFunc={handleButton} padding="p-3" width="w-44" rounded="rounded-md" otherStyle="my-4" title={button}/>
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