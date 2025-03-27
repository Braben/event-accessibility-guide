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
import OnboardingModal from "../components/OnboardingModal";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 p-10">
        {/* Left Section (Form) */}
        <div className="md:w-1/2 p-8">
          <h4 className="font-bold text-2xl mb-4">Create an Account</h4>
          <div>
            {/* Signup form */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              {/* First Name Input */}
              <div className="w-full sm:w-1/2">
                <Typography
                  as="label"
                  htmlFor="FirstName"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  First Name
                </Typography>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  placeholder="John"
                  className="w-full placeholder:italic placeholder:text-slate-400"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name Input */}
              <div className="w-full sm:w-1/2">
                <Typography
                  as="label"
                  htmlFor="LastName"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  Last Name
                </Typography>
                <Input
                  id="LastName"
                  type="text"
                  value={lastName}
                  placeholder="Doe"
                  className="w-full placeholder:italic placeholder:text-slate-400"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

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
                onChange={(e) => setPassword(e.target.value)}
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

            <OnboardingModal />

            <div className="flex items-center w-full my-4">
              <div className="flex-1 border-t border-gray-400"></div>
              <span className="px-3 text-sm text-gray-500">
                Or Register with
              </span>
              <div className="flex-1 border-t border-gray-400"></div>
            </div>

            <Button
              className="hover:bg-inherit hover:text-black"
              isFullWidth
              variant="outline"
            >
              <span className="pr-2">
                <FcGoogle size={20} />
              </span>
              Continue with Google
            </Button>

            <p className="text-center mt-3">
              Already have an Account?{" "}
              <span>
                <Link to="/login" className="text-blue-600">
                  login
                </Link>
              </span>
            </p>
          </div>
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
