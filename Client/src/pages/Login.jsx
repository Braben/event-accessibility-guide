import React from "react";
import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import wheelchairImage from "../Assets/side-view-woman-sitting-wheelchair_1048944-821772 1.png";
import groupPlusWheel from "../Assets/side-view-portrait-big-african-american-family-with-person-wheelchair-welcoming-guests-sum_236854-44054 1.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 p-10">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-8">
          <h4 className="font-bold text-2xl">Welcome back</h4>
          <p className="mb-4 text-sm">Please enter your details to Login</p>

          {/* Email Input */}
          <div className="w-full mb-4">
            <Typography
              as="label"
              htmlFor="text3"
              type="small"
              color="default"
              className="font-semibold"
            >
              Email
            </Typography>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="john.doe@example.com"
              className="w-full placeholder:italic placeholder:text-slate-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
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
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              className="w-full placeholder:italic placeholder:text-slate-400 pr-10"
              onChange={setPassword}
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-6 flex items-center text-black"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <Button className="mt-2 font-bold w-full">Login</Button>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-gray-400"></div>
            <span className="px-3 text-sm text-gray-500">Or Continue with</span>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>

          {/* Google Login */}
          <Button
            className="hover:bg-inherit hover:text-black"
            isFullWidth
            variant="outline"
          >
            <span className="pr-2">
              <FcGoogle size={20} />
            </span>{" "}
            Google
          </Button>

          <p className="text-center mt-3">
            Don't have an Account?{" "}
            <span>
              <Link to="/signup" className="text-blue-600">
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
            <div className="absolute inset-x-0 bottom-0 -translate-y-24 translate-x-6 text-white">
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
