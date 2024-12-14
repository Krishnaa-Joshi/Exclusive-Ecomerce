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
    <div className="w-[54vw] h-[90vh] my-28 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-medium my-2.5">Log in to Exclusive</h1>
      <h3 className="font-medium w-1/2 my-2.5">Enter your details below</h3>
      {errors.global && (
        <p className="text-red-600 text-lg font-medium text-center mb-5">
          {errors.global}
        </p>
      )}
      <form
        action="post"
        className="flex flex-col w-1/2 mt-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          placeholder="Email or Phone Number"
          className="border-b-2 border-b-[#808080] py-2.5 w-[26vw] my-3 focus:outline-none"
        />
        {errors.emailOrPhone && (
          <p className="text-red-600 text-lg font-medium text-center">
            {errors.emailOrPhone}
          </p>
        )}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border-b-2 border-b-[#808080] py-2.5 w-[26vw] my-3 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-600 text-lg font-medium text-center">
            {errors.password}
          </p>
        )}

        <div className="flex w-[26vw] justify-between text-lg">
          <input
            type="submit"
            value={isSubmitting ? "Logging in..." : "Log in"}
            disabled={isSubmitting}
            className={`bg-[#DB4444] text-[#FAFAFA] py-[15px] w-[9vw] my-[20px] cursor-pointer rounded-md focus:outline-none ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
          />
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-[#DB4444] font-medium"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
