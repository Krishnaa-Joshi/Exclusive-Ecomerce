// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function Message(){
    const {errorType,error} = useContext(Context);

    return(
        <div className={` absolute top-56 w-full flex justify-center `}>
          <p
            className={`${
              errorType ? "bg-green-500 w-1/4" : "bg-[#DB4444] w-1/2"
            } text-xl p-4 rounded-lg  text-center text-white`}
          >
            {error}
          </p>
        </div>
    );
}

export default Message;