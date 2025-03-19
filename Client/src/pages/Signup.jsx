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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div class="flex gap-4 p-10">
        <div class="w-1/2 p-8 ">
          <h4 className="font-bold text-2xl mb-4">Create an Account</h4>
          <div>
            {/* Signup form */}
            <div className="flex justify-between gap-4 mb-4">
              {/* Left Input Field */}
              <div className="w-1/2">
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
                  // value={venueName}
                  placeholder="John"
                  className="w-full placeholder:italic placeholder:text-slate-400 "
                  // onChange={(e) => setVenueName(e.target.value)}
                />
              </div>

              {/* Right Input Field */}
              <div className="w-1/2">
                <Typography
                  as="label"
                  htmlFor="text2"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  Last Name
                </Typography>
                <Input
                  id="LastName"
                  type="text"
                  // value={venueCapacity}
                  placeholder="Doe"
                  className="w-full placeholder:italic placeholder:text-slate-400"
                  // onChange={(e) => setVenueCapacity(e.target.value)}
                />
              </div>
            </div>
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
                // value={venueImage}
                placeholder="john.doe@example.com"
                className="w-full placeholder:italic placeholder:text-slate-400"
                // onChange={(e) => setVenueImage(e.target.value)}
              />
            </div>
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
                type={showPassword ? "text" : "password"} // Toggle between text & password
                placeholder="Minimum length is 6 characters"
                className="w-full placeholder:italic placeholder:text-slate-400 pr-10"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-6 flex items-center text-black stoke-"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <Button className="mt-2 font-bold  w-full">Create Account</Button>
            <div className="flex items-center w-full my-4">
              <div className="flex-1 border-t border-gray-400"></div>
              <span className="px-3 text-sm text-gray-500 ">
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
              </span>{" "}
              Continue with google
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
        <div className="w-1/2 relative">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div> */}
          <figure className="w-full h-full">
            <img
              src={wheelchairImage}
              className="rounded-lg  object-cover scale-x-[-1] w-full "
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Signup;
