// Hooks
import React, { useState, useEffect, useCallback } from "react";

// PropTypes
import PropTypes from "prop-types";

const CountdownTimer = ({ targetDate }) => {
  // Memoized calculateTimeLeft function
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = new Date(targetDate) - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]); // Recompute only when targetDate changes

  // State to hold time left
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  // update the countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [calculateTimeLeft]);

  return (
    <div className="flex items-center my-3 w-[65vw] mx-3 md:my-4 md:w-[50vw] lg:w-[60vw] lg:items-end lg:mx-7 xl:w-[45vw] 2xl:w-2/5">
      {/* Heading */}
      <div className="mr-4">
        <h1 className="font-bold text-center sm:hidden lg:text-4xl lg:text-start">
          Big Sale
        </h1>
        <h1 className="font-bold text-center hidden sm:text-xl sm:block md:text-2xl md:text-start lg:text-3xl xl:text-4xl">
          Flash Sales
        </h1>
      </div>

      {/* Timer */}
      <div className="flex space-x-1 text-center lg:items-center lg:space-x-4">
        {Object.entries(timeLeft).map(([unit, value], index, arr) => (
          <React.Fragment key={unit}>
            <div className="flex flex-col lg:items-center">
              <span className="text-xs sm:text-sm uppercase lg:mb-1">
                {unit}
              </span>
              <span className="font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                {value?.toString().padStart(2, "0") || "00"}
              </span>
            </div>
            {index < arr.length - 1 && (
              <span className="font-bold relative top-4 sm:text-xl sm:top-[18px] md:top-5 lg:text-3xl lg:top-2 xl:text-4xl">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Validating prop types
CountdownTimer.propTypes = {
  targetDate: PropTypes.string.isRequired, // Ensure targetDate is required
};

export default CountdownTimer;
