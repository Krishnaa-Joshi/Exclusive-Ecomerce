// Hooks and Library
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // handle onChange Function
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // validation logic
  const validataionForm = () => {
    const newErrors = {};
    if (!formData.emailOrPhone.trim())
      newErrors.emailOrPhone = "Please enter your email or phone";
    if (!formData.password.trim())
      newErrors.password = "Please enter your password";
    return newErrors;
  };

  // handle Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validataionForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    try {
      // Login request to server
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      // save token to local Storage
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      navigate("/"); //navigate to home Page
      window.location.reload();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setErrors({ global: err.response.data.error });
      } else {
        setErrors({ global: "An unexpected error occurred." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[65vh] items-center flex flex-col sm:w-[54vw] sm:h-[90vh] sm:my-28 sm:justify-center">
      <h1 className="text-3xl font-semibold sm:text-4xl sm:w-[47vw] sm:font-medium sm:my-2.5 md:w-[42vw] lg:w-[42vw] lg:text-5xl xl:w-[32vw] xl:text-start 2xl:w-auto">
        Log in to Exclusive
      </h1>
      <h3 className="font-medium my-2 sm:my-2.5 sm:w-[44vw] md:w-[41vw] lg:w-[41vw] xl:w-[30vw] xl:text-start 2xl:w-1/2">
        Enter your details below
      </h3>
      {/* Error Display */}
      {errors.global && (
        <p className="text-red-600 text-xs font-medium text-center sm:text-sm sm:mb-5 md:text-lg">
          {errors.global}
        </p>
      )}
      <form
        action="post"
        className="flex flex-col mt-4 xl:w-[30vw] 2xl:w-1/2"
        onSubmit={handleSubmit}
      >
        {/* Email or Phone No. */}
        <input
          type="text"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          placeholder="Email or Phone Number"
          className="border-b-2 border-b-[#808080] py-2.5 w-[75vw] my-3 focus:outline-none sm:w-[45vw] md:w-[41vw] xl:w-[30vw] 2xl:w-[26vw] "
        />
        {errors.emailOrPhone && (
          <p className="text-red-600 text-xs font-medium text-center sm:text-sm md:text-lg">
            {errors.emailOrPhone}
          </p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border-b-2 border-b-[#808080] py-2.5 w-[75vw] my-3 focus:outline-none sm:w-[45vw] md:w-[41vw] xl:w-[30vw] 2xl:w-[26vw]"
        />
        {errors.password && (
          <p className="text-red-600 text-xs font-medium text-center sm:text-sm md:text-lg">
            {errors.password}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex w-[75vw] justify-between sm:text-lg sm:w-[45vw] md:w-[41vw] lg:w-[41vw] xl:w-[30vw] 2xl:w-[26vw]">
          <input
            type="submit"
            value={isSubmitting ? "Logging in..." : "Log in"}
            disabled={isSubmitting}
            className={`bg-[#DB4444] text-[#FAFAFA] py-3 w-[20vw] my-[20px] rounded-md focus:outline-none text-sm sm:text-base sm:cursor-pointer sm:w-[12vw] md:py-[15px] lg:w-[10vw] xl:w-[9vw] ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            } `}
          />

          {/* Forget Password */}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-[#DB4444] font-medium text-sm sm:text-base"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
