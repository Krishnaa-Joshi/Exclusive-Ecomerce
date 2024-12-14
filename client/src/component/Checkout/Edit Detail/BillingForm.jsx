function BillingForm() {
  return (
      <form action="post">
        <div className="flex flex-col">
          <label htmlFor="First Name">First Name*</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Last Name">Last Name*</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Street Address">Street Address*</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Apartment, Floor etc (optional)">{`Apartment, Floor etc (optional)`}</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Town/City">Town/City*</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Phone Number">Phone Number*</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Email Address" className="text-[#F5F5F5]">
            Email Address*
          </label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
            required
          />
        </div>
      </form>
  );
}

export default BillingForm;
