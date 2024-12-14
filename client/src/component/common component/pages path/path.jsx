import { Context } from "@/context";
import { useContext } from "react";

// show path from home to current page
function Path() {
  const { currentPage } = useContext(Context);
  const pathParts = currentPage.split("/");
  return (
    <div className="flex h-24 items-end relative left-24 w-64">
      <p className="text-[#909090] mr-2.5">Home</p>
      <p className="text-[#909090] mr-2.5">/</p>
      {pathParts.map((part, index) => (
        <span key={index} className="flex items-center">
          <p
            className={`${
              index === pathParts.length - 1 ? "font-medium" : "text-[#909090]"
            }`}
          >
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </p>
          {index < pathParts.length - 1 && (
            <p className="text-[#909090] mx-2.5">/</p>
          )}
        </span>
      ))}
    </div>
  );
}

export default Path;
