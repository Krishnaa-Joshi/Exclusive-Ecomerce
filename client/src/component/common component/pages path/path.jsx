import { Context } from "@/context";
import { useContext } from "react";

// show path from home to current page
function Path() {
  const { currentPage } = useContext(Context);
  
  return (
    <div className="flex h-24 items-end relative left-24 w-64">
      <p className="text-[#909090] mr-2.5">Home</p>
      <p className="text-[#909090] mr-2.5">/</p>
      <p className="font-semibold">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</p>
    </div>
  );
}

export default Path;
