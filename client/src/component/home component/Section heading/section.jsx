
// handle section heading in home Page 
function SectionHeading({heading}) {
  return (
    <div className="flex">
      <div className="bg-red-500 w-5 h-8 rounded-sm ml-7"></div>
      <p className="text-red-500 mt-0.5 ml-2 font-semibold text-xl">{heading}</p>
    </div>
  );
}

export default SectionHeading;
