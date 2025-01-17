// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function Message() {
  const { errorType, error } = useContext(Context);

  return (
    <div className="w-full flex justify-center mt-5 sm:my-0 sm:mt-8">
      <p
        className={`text-white text-center text-lg p-2 rounded-sm md:text-lg md:p-4 md:rounded-lg lg:text-xl ${
          errorType
            ? "bg-green-500 w-56 lg:w-1/4"
            : "bg-[#DB4444] w-56 lg:w-1/2"
        }`}
      >
        {error}
      </p>
    </div>
  );
}

export default Message;
