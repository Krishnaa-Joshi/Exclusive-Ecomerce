// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function Path() {
  const { currentPage } = useContext(Context);
  
  return (
    <div className="flex items-end h-14 relative left-7 sm:h-16 sm:left-10 md:items-center md:h-32 md:left-14 lg:h-20 lg:items-end lg:left-20 lg:w-64">
      <p className="text-[#909090] text-sm sm:text-base mr-1 lg:mr-2.5">Home</p>
      <p className="text-[#909090] text-sm sm:text-base mr-1 lg:mr-2.5">/</p>
      <p className="font-semibold text-sm lg:text-base">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</p>
    </div>
  );
}

export default Path;
