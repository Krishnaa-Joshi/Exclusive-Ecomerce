// Hooks and Library
import { useContext, useState } from "react";
import { Context } from "@/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// SVGs
import Google from "../../../assets/Auth Assets/Signup/google.svg"

function Signup() {

  const { isLogin, setIsLogin } = useContext(Context);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    password: "",
  });
  const navigate = useNavigate();

  // Switch between Login and SignUp page
  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
    navigate(isLogin ? "/signUp" : "/login");
  };

  // handle Change on Input Fields 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Form Validataion Logic For displaying Error
  const validataionForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "please enter your name";
    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = "Please enter your email or phone number";
    }
    if (!formData.password) newErrors.password = "please enter your password";
    return newErrors;
  };

  // handle google Authentication 
  const handleGoogleLogin = ()=>{
    window.location.href = "http://localhost:5000/auth/callback"
  }

  //  action on submit button 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all Input field is filled or not 
    const validationErrors = validataionForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } 
    try {
      // signup request to  server 
      const response = await axios.post(
        "http://localhost:5000/signUp",
        formData
      ); 
      localStorage.setItem("token", response.data.token); //save token to local storage
      console.log(response.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      // handle Error
      if (err.response) {
        if (err.response.status === 401) {  // if user alredy Exits 
          setErrors({ global: err.response.data.error }); 
        } else {
          setErrors({ global: err.response.data.error }); 
        } 
      } else {
        setErrors({ global: "Network Error: Unable to reach server." }); 
      }
    }
  };


  
  return (
    <div className="mb-20 flex flex-col justify-center items-center sm:mb-0 sm:w-[54vw] sm:h-screen sm:my-28 md:h-[90vh]">
      <h1 className="text-3xl font-semibold sm:font-medium sm:my-2.5 sm:text-4xl sm:w-[47vw] md:w-[42vw] lg:w-[42vw] lg:text-5xl xl:text-start xl:w-[32vw] 2xl:w-auto">Create an Account</h1>
      <h3 className="font-medium sm:my-2.5 sm:w-[44vw] md:w-[41vw] lg:w-[41vw] xl:w-[30vw] xl:text-start 2xl:w-1/2">Enter your details below</h3>
      
      <form
        action="post"
        onSubmit={handleSubmit}
        className="flex flex-col mt-4 xl:w-[30vw] 2xl:w-1/2"
        >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border-b-2 border-b-[#808080] py-2.5 w-[75vw] my-3 focus:outline-none sm:w-[45vw] md:w-[41vw] xl:w-[30vw] 2xl:w-[26vw]"
          />
        {errors.name && (
          <p className="text-red-600 text-xs font-medium text-center sm:text-sm md:text-lg">
            {errors.name}
          </p>
        )}

        {/* Email */}
        <input
          type="text"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          placeholder="Email or Phone Number"
          className="border-b-2 border-b-[#808080] py-2.5 w-[75vw] my-3 focus:outline-none sm:w-[45vw] md:w-[41vw] xl:w-[30vw] 2xl:w-[26vw]"
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

        {/* Submit */}
        <input
          type="submit"
          value="Create Account"
          className="bg-[#DB4444] text-[#FAFAFA] py-2.5 my-3 w-[75vw] cursor-pointer rounded-md focus:outline-none sm:my-[20px] sm:w-[45vw] sm:py-[15px] md:w-[41vw] xl:w-[30vw] 2xl:w-[26vw]"
          />
      </form>

        {/* Global Error */}
      {errors.global && (
        <p className="text-red-600 text-xs font-medium text-center sm:mb-5 sm:text-sm md:text-lg">
          {errors.global}
        </p>
      )}

      {/* Auth signUp  */}
      <div className="flex justify-center py-2.5 w-[75vw] border-2 border-[#999999] rounded-md cursor-pointer sm:mb-2.5 sm:w-[45vw] sm:py-[15px] md:w-[41vw] xl:w-[30vw] 2xl:w-[26vw] 2xl:relative 2xl:left-2.5" onClick={handleGoogleLogin}>
        <img src={Google} alt="" />
        <p className="ml-3 font-medium text-lg sm:text-xl sm:ml-[15px]" >Sign up with Google</p>
      </div>

      {/* Swich to Login if Alredy have account */}
      <div className="flex mt-5">
        <p className="text-[#4D4D4D] mr-2.5">Already have an account?</p>
        <p
          className="text-[#4D4D4D] border-b-2 border-b-[#808080] hover:text-black cursor-pointer font-medium"
          onClick={handleSwitch}
          >
          Log in
        </p>
      </div>
    </div>
  );
}

export default Signup;

// securepassword123