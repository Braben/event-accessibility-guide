import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import wheelchairImage from "../Assets/side-view-woman-sitting-wheelchair_1048944-821772 1.png";
import OnboardingModal from "../components/OnboardingModal";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

// Import Firebase authentication functions
import { signUpWithEmail, signInWithGoogle } from "../services/authService";

const Signup = () => {
  const { user, userDetails, loading } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [newUser, setNewUser] = useState(null);

  const handleChange = (e) => {
    // Update the formData state with the new value
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = formData;
    const newUser = await signUpWithEmail(firstname, lastname, email, password);
    setNewUser(newUser)
    
    //save user to database

    // // Display a success message
    // alert("Account created successfully!");
    console.log(formData)
    // Reset form data after successful signup
    // setFormData({
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    //   password: "",
    // });
    // Redirect to another page or perform any other action
    // window.location.href = "/dashboard"; // Example redirect
    // or use a router like react-router-dom to navigate
    // navigate("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    // Call your Google sign-in function here
    const user = await signInWithGoogle();
    console.log(user);
    toast.success("Signed in with Google successfully!");
    // Reset form data after successful signup
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    // Redirect to another page or perform any other action
    // window.location.href = "/"; // Example redirect
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 p-10">
        {/* Left Section (Form) */}
        <div className="md:w-1/2 p-8">
          <h4 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">
            Create an Account
          </h4>
          <form onSubmit={handleSubmit}>
            <div>
              {/* Signup form */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                {/* First Name Input */}
                <div className="w-full sm:w-1/2">
                  <Typography
                    as="label"
                    htmlFor="FirstName"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    First Name
                  </Typography>
                  <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      placeholder="John"
                      className="w-full placeholder-italic placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-white"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Last Name Input */}
                <div className="w-full sm:w-1/2">
                  <Typography
                    as="label"
                    htmlFor="LastName"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    Last Name
                  </Typography>
                  <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <Input
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      placeholder="Doe"
                      className="w-full placeholder-italic placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-white"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="w-full mb-4">
                <Typography
                  as="label"
                  htmlFor="email"
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  Email
                </Typography>
                <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="off" 
                    value={formData.email}
                    placeholder="johndoe@example.com"
                    className="w-full placeholder-italic placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-white"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="w-full relative mb-4">
                <Typography
                  as="label"
                  htmlFor="password"
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  Password
                </Typography>
                <div className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password" 
                    value={formData.password}
                    placeholder="Enter password"
                    className="w-full placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-white"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-900 dark:text-white"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              
              <OnboardingModal password={formData.password} user={user} />

              <div className="flex items-center w-full my-4">
                <div className="flex-1 border-t border-gray-400 dark:border-gray-600"></div>
                <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
                  Or Register with
                </span>
                <div className="flex-1 border-t border-gray-400 dark:border-gray-600"></div>
              </div>

              <Button
                className="hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white"
                isFullWidth
                variant="outline"
                onClick={handleGoogleSignIn}
              >
                <span className="pr-2">
                  <FcGoogle size={20} />
                </span>
                Continue with Google
              </Button>

              <p className="text-center mt-3 text-gray-900 dark:text-white">
                Already have an Account?{" "}
                <span>
                  <Link
                    to="/login"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    login
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>

        {/* Right Section (Image) - Hidden on Mobile */}
        <div className="hidden md:block md:w-1/2 relative">
          <figure className="w-full h-full relative">
            <img
              src={wheelchairImage}
              className="rounded-lg object-cover scale-x-[-1] w-full h-[28rem]"
            />
            <div className="absolute inset-x-0 bottom-0 -translate-y-24 translate-x-6 text-white">
              <h3 className="tracking-wide text-2xl font-bold">
                Join Our Community
              </h3>
              <p>Help us make the world more accessible to everyone</p>
            </div>
            <div className="absolute -translate-y-10 rounded-md rotate-45 bg-orange-400 bottom-0 right-0 h-12 w-12"></div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Signup;