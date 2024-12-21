// PropTypes
import PropTypes from "prop-types";

function Button({width,padding,rounded,handleFunc,title,otherStyle = ""}){
    return(
        <>
            <button
            className={`bg-[#DB4444] p-2.5 text-white ${width} ${padding} ${rounded} ${otherStyle}`}
            {...(handleFunc && { onClick: handleFunc })}
          >
            {title}
          </button>
        </>
    );
}

export default Button;

// Props Validation
Button.propTypes = {
    width: PropTypes.string,
    padding: PropTypes.string,
    rounded: PropTypes.string,
    title:PropTypes.string,
    otherStyle: PropTypes.string,
    handleFunc: PropTypes.func,
}