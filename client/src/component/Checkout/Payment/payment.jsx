// SVGS
import Visa from "../../../assets/Checkout assets/Visa.svg";
import MasterCard from "../../../assets/Checkout assets/masterCard.svg";
import NotSelceted from "../../../assets/Checkout assets/radio.svg";
import Selected from "../../../assets/Checkout assets/radioCheck.svg";

// Hooks
import { useState } from "react";

function Payment() {
  const [check, setCheck] = useState("COD");
  const payementMode = (Mode) => {
    setCheck(Mode);
  };

  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div>
      <div className="flex flex-col-reverse w-full md:flex-row md:justify-between lg:w-[390px] ">
        {/* Card */}
        <div className="flex mx-2 mt-5 md:mt-0 md:mx-0 md:my-3" onClick={() => payementMode("Bank")}>
          <img
            src={check === "Bank" ? Selected : NotSelceted}
            alt=""
            className="w-4 mr-2"
          />
          <p className="font-medium text-lg sm:text-xl md:text-lg lg:text-xl">
            Credit Card or Debit Card
          </p>
        </div>
        <div className="flex justify-center">
          <img src={Visa} alt="Visa" className="w-[25vw] md:w-12 lg:w-auto" />
          <img
            src={MasterCard}
            alt="MasterCard"
            className="w-[25vw] md:w-12 lg:w-auto"
          />
        </div>
      </div>
      {check === "Bank" ? (
        <div>
          <div className="ml-7 md:ml-0 md:mx-5 lg:ml-5">
            <form>
              {/* Card Holder Name */}
              <input
                type="text"
                placeholder="Cardholder Name"
                className="bg-[#F5F5F5] focus:outline-none rounded-md p-2 w-64 my-1 mr-2 sm:w-72 sm:p-2.5 sm:my-2 md:mr-0 md:w-80"
              />

              {/* Card Number */}
              <input
                type="text"
                placeholder="Card number"
                className="bg-[#F5F5F5] focus:outline-none rounded-md p-2 w-64  my-1 sm:p-2.5 sm:w-72 sm:my-2.5 md:w-80"
              />

              {/* Expiry Date */}
              <p className="font-bold my-3 md:my-0">Expiry date</p>

              {/* Expiry Month */}
              <div className="flex justify-between my-2 w-60 md:w-72">
                <select
                  id="expMonth"
                  name="expMonth"
                  className="bg-[#F5F5F5] p-2.5 w-28 rounded-md focus:outline-none sm:w-32 sm:mr-2 "
                  required
                >
                  <option value="" disabled selected>
                    Month
                  </option>
                  {months.map((month) => (
                    <option
                      key={month}
                      value={month < 10 ? `0${month}` : month}
                    >
                      {month < 10 ? `0${month}` : month}
                    </option>
                  ))}
                </select>

                {/* Expiry Year */}
                <select
                  id="expYear"
                  name="expYear"
                  className="bg-[#F5F5F5] p-2.5 w-28 rounded-md focus:outline-none sm:w-32"
                  required
                >
                  <option value="" disabled selected>
                    Year
                  </option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Cash on Delivery */}
      <div className="flex mx-2 my-4 md:my-0 md:mx-0" onClick={() => payementMode("COD")}>
        <img
          src={check === "COD" ? Selected : NotSelceted}
          alt=""
          className="w-4 mr-2"
        />
        <p className="font-medium text-lg sm:text-xl md:text-lg lg:text-xl">Cash on Delivery</p>
      </div>
    </div>
  );
}

export default Payment;
