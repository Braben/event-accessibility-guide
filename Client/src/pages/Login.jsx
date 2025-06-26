import React from "react";
import { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "../services/authService";
import {
  Button,
  Input,
  Checkbox,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import groupPlusWheel from "../Assets/side-view-portrait-big-african-american-family-with-person-wheelchair-welcoming-guests-sum_236854-44054 1.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // Update the formData state with the new value
    // e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const user = await signInWithEmail(email, password);
    if (user) {
      toast.success("Signed in successfully!");
      console.log(user);
      if (user.user?.role === "USER") {
        navigate("/venues");
      } else if (user.user?.role === "ADMIN") {
        navigate("/organizer/dashboard");
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    // Call your Google sign-in function here
    const user = await signInWithGoogle();
    console.log(user);
    alert("Signed in with Google successfully!");
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white ">
      <div className="flex flex-col sm:flex-row gap-4 p-10">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-8">
          <h4 className="font-bold text-2xl">Welcome back</h4>
          <p className="mb-4 text-sm">Please enter your details to Login</p>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="w-full mb-4">
              <Typography
                as="label"
                htmlFor="email"
                type="small"
                color="default"
                className="font-semibold"
              >
                Email
              </Typography>
              <div className="bg-gray-200 dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-lg">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="john.doe@example.com"
                  className="w-full placeholder:italic placeholder:text-slate-400 dark:placeholder:text-gray-300 bg-transparent border-none focus:ring-0 focus:outline-none dark:text-white hover:border-none"
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="w-full relative mb-4">
              <Typography
                as="label"
                htmlFor="password"
                type="small"
                color="default"
                className="font-semibold"
              >
                Password
              </Typography>

              <div className="bg-gray-200 dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-lg">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter password"
                  className="w-full placeholder:italic placeholder:text-slate-400 dark:placeholder:text-gray-300 pr-10 bg-transparent border-none focus:ring-0 focus:outline-none dark:text-white hover:border-none"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 top-6 flex items-center text-black dark:text-white"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="mt-2 font-bold w-full dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-gray-400 dark:border-gray-600"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
              Or Continue with
            </span>
            <div className="flex-1 border-t border-gray-400 dark:border-gray-600"></div>
          </div>

          {/* Google Login */}
          <Button
            className="hover:bg-inherit hover:text-black dark:hover:text-white"
            isFullWidth
            variant="outline"
            onClick={handleGoogleSignIn}
          >
            <span className="pr-2">
              <FcGoogle size={20} />
            </span>{" "}
            Google
          </Button>

          <p className="text-center mt-3">
            Don't have an Account?{" "}
            <span>
              <Link to="/signup" className="text-blue-600 dark:text-blue-400">
                Sign up
              </Link>
            </span>
          </p>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full hidden sm:block sm:w-1/2 relative">
          <figure className="w-full h-full relative">
            <img
              src={groupPlusWheel}
              className="rounded-lg object-cover scale-x-[-1] w-full h-[24rem]"
            />
            <div className="absolute inset-x-0 bottom-0 -translate-y-24 translate-x-6 text-white dark:text-gray-300">
              <h3 className="tracking-wide text-2xl font-bold">Welcome Back</h3>
              <p>Continue your journey to make the world more accessible</p>
            </div>
            <div className="absolute -translate-y-10 rounded-md rotate-45 bg-blue-900 shadow-lg shadow-blue-500/30 bottom-3 -left-4 h-12 w-12"></div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Login;
