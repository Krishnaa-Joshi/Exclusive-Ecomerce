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
    <div className="w-[54vw] h-[90vh] my-28 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-medium my-2.5">Create an Account</h1>
      <h3 className="font-medium w-1/2 my-2.5">Enter your details below</h3>
      
      <form
        action="post"
        onSubmit={handleSubmit}
        className="flex flex-col w-1/2 mt-4"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border-b-2 border-b-[#808080] py-2.5 w-[26vw] my-3 focus:outline-none"
        />
        {errors.name && (
          <p className="text-red-600 text-lg font-medium text-center">
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
          className="border-b-2 border-b-[#808080] py-2.5 w-[26vw] my-3 focus:outline-none"
        />
        {errors.emailOrPhone && (
          <p className="text-red-600 text-lg font-medium text-center">
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
          className="border-b-2 border-b-[#808080] py-2.5 w-[26vw] my-3 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-600 text-lg font-medium text-center">
            {errors.password}
          </p>
        )}

        {/* Submit */}
        <input
          type="submit"
          value="Create Account"
          className="bg-[#DB4444] text-[#FAFAFA] py-[15px] w-[26vw] my-[20px] cursor-pointer rounded-md focus:outline-none"
        />
      </form>

        {/* Global Error */}
      {errors.global && (
        <p className="text-red-600 text-lg font-medium text-center mb-5">
          {errors.global}
        </p>
      )}

      {/* Auth signUp  */}
      <div className="flex justify-center relative left-2.5 w-[26vw] py-[15px] border-2 border-[#999999] rounded-md mb-2.5 cursor-pointer" onClick={handleGoogleLogin}>
        <img src={Google} alt="" />
        <p className="ml-[15px] text-xl font-medium" >Sign up with Google</p>
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