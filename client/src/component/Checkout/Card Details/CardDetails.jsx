function CardDetails() {
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  return (
    <div className="mx-5">
      <form>
        <input type="text" placeholder="Cardholder Name" className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2"/>
        <input type="text" placeholder="Card number" className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"/>
        <p className="font-bold">Expiry date</p>
        <div  className="flex justify-between my-2 w-72">
          <select id="expMonth" name="expMonth" className="bg-[#F5F5F5] p-2.5 w-32 rounded-md focus:outline-none" required>
            <option value="" disabled selected>
              Month
            </option>
            {months.map((month) => (
              <option key={month} value={month < 10 ? `0${month}` : month}>
                {month < 10 ? `0${month}` : month}
              </option>
            ))}
          </select>

          <select id="expYear" name="expYear" className="bg-[#F5F5F5] p-2.5 w-32 rounded-md focus:outline-none" required>
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
  );
}

export default CardDetails;
