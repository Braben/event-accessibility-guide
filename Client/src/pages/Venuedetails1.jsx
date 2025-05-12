import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { TbWheelchair } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { PiEnvelopeSimpleThin } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { FaElevator } from "react-icons/fa6";
import { SlEye } from "react-icons/sl";
import { CiLocationArrow1 } from "react-icons/ci";
import { BiBath } from "react-icons/bi";
import { LuSquareParking } from "react-icons/lu";
import { IoEarSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

import { useLocation, useParams } from "react-router-dom";

const Venuedetails1 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const location = useLocation();
  const { venue } = location.state || {};
  const { id } = useParams(); // Optional if you need the slug

  if (!venue) {
    return <div className="p-8 text-red-500 text-xl">Venue not found.</div>;
  }

  const handleReviewSubmit = (reviewData) => {
    console.log("Review submitted:", reviewData);
  };

  const contentMap = {
    overview: (
      <div className="mt-4 my-5">
        <h2 className="text-2xl font-bold">About this venue</h2>
        <p className="mt-6 text-sm">
          {/* A fully accessible arts venue with regular exhibitions and
          performances. The center features multiple gallery spaces, a theater,
          and workshop areas for community art programs. */}
          {venue.description}
        </p>
        {/* accessibility features */}
        <h2 className="mt-8 font-bold text-lg">Accessibility Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="flex bg-gray-100 h-20 p-4 gap-4 rounded-lg">
            <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
              <TbWheelchair className="text-blue-800 text-2xl" />
            </div>
            <div>
              <h1 className="font-bold">Wheelchair Accessible</h1>
              <p className="text-sm mt-1">
                Ramps and wide doorways throughout venue
              </p>
            </div>
          </div>

          <div className="flex bg-gray-100 h-20 p-4 gap-4 rounded-lg">
            <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
              <BiBath className="text-blue-800 text-2xl" />
            </div>
            <div>
              <h1 className="font-bold">Accessible restrooms</h1>
              <p className="text-sm mt-1">
                ADA-compliant restrooms on all floors
              </p>
            </div>
          </div>

          <div className="flex bg-gray-100 h-20 p-4 gap-4 rounded-lg">
            <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
              <FaElevator className="text-blue-800 text-2xl" />
            </div>
            <div>
              <h1 className="font-bold">Elevator access</h1>
              <p className="text-sm mt-1">
                Elevators to all levels of the venue
              </p>
            </div>
          </div>

          <div className="flex bg-gray-100 h-20 p-4 gap-4 rounded-lg">
            <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
              <LuSquareParking className="text-blue-800 text-2xl" />
            </div>
            <div>
              <h1 className="font-bold">Accessible parking</h1>
              <p className="text-sm mt-1">
                Designated accessible spaces near entrance
              </p>
            </div>
          </div>

          <div className="flex bg-gray-100 h-20 p-4 gap-4 rounded-lg">
            <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
              <SlEye className="text-blue-800 text-2xl" />
            </div>
            <div>
              <h1 className="font-bold">Visual accessibility</h1>
              <p className="text-sm mt-1">
                Braille signage and high contrast displays
              </p>
            </div>
          </div>

          <div className="flex bg-gray-100 h-20 p-4 gap-4 rounded-lg">
            <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
              <IoEarSharp className="text-blue-800 text-2xl" />
            </div>
            <div>
              <h1 className="font-bold">Hearing accessibility</h1>
              <p className="text-sm mt-1">
                Hearing loop system in main theater
              </p>
            </div>
          </div>
        </div>
        {/* photos */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Photos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <img
              src="https://s3-alpha-sig.figma.com/img/ccbf/82d5/cabd6c9a588eab6defc16b42629343ca?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j5aE28KVS9R2yqVW88XoJVIfT3JBXve0jqURuXbgnvRY~WXodIREAJv5RNxm~oG-nO78p1XoICCKNbSkzc~Tk0485fn2UQJn-jqACWGZnMKvQ6mr13BtcmothMv6xQg6zT37wrIZJuKi1449ruHqMei6SMvn9ZmBlO7wWo65u2n7Jg2GvWM2M0TUaHc-uwQ7xoF3~RKSoCohLdfvlPD2ubRwyLMnTwivxTwFW96GLlACryiwThX08GbL1RvIu9ZB4v6xnVRKGMRBUFflQY8S5y~FPynwx-2M4xQhavJBLOGrOvvVAg3u6puWYVmoOb3JTyndpiv1Piazf6Zd7opihQ__"
              alt="Venue photo"
              className="h-48 w-full object-cover rounded-lg"
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/5276/eca0/6af7d90d974fedbe1f75dc7ad3f5eb9c?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MZ2-AKk-ayx7jjiu5OtbLsAAHEarob2JLxpnoh1LU5QVg4cJBFKWd5k53fY4hMdAuYkHToMZvMZ3HWjO0eaC1VuiD4TzyaFsC9qgCCihqFnphP6ZO28T5sue3DygLPUh2GHLBzWt2n8J18MU8~TG99Le8tnluVbmN7XAUjXN9DcwXvM3uiz5Eqim8pktxmsfnT4zzNmU2osf1do9YOHNu-cY8bfGRQgQMdcNPyqLH9htnN0w1yc33m2NKwZT7H~GYyF5aNwuCX658Terbja4kaQMKHGA5qLzMth19MHrUijOyg1pX01fce3sc0~KOh6C7QXcH8vRT6T9iFsbRviDhQ__"
              alt="Venue photo"
              className="h-48 w-full object-cover rounded-lg"
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/27f1/09eb/fdbc3d53b10d4a60a2d481488cc45da1?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jkFJ4t-LyVBy-fmea1cjX5DIU6-jDgNTObVytIyKzejlIVatvKvACsoSmLEajZMyHzOn5pA4d4y7oYTjm42Uh50IhH~~sHR4u1n9BG55oZbxdNq7mXkLJVxSw1oCttRctqVAmzhIf~llK~FpclcSpqF-uR92dqr7WFkvtUW5KiJlKTYsJ70kQcc14zMW~AxXwgs2ATWmHjUUkJCd09EuRZVWDZWQxNncyb2jLjxYkiA-~a3Fug~p~CW~DIf5xIRPrgdHR1bAwUA0EdyM4JBml2cGrZkkiRCw4ytGUWtpb3r-~DQ46InEM3KgMi4vnvXPXF3QTbyBBpEFTS-RkNUiUg__"
              alt="Venue photo"
              className="h-48 w-full object-cover rounded-lg"
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/63bd/214c/b1c35e0a970cef386ec3e14b4fcb7e16?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QfCXbg7xE1UZ~L97rcx7dSHZ7UQ03Y9SxgkggvNW2xNRO6oW~bTh-f5uWw5oaIC1g9X9wX~hsic6JluNGyPWdjcm6NQiVXxR-jhJzQQCBl9Y1UAgEcWjdqDF1O0qVkfmoN3EP6zo3WnNR2fW-PyG6KZ3yBWPrjfzqcyfWCodeysdpcidqyHpKbDACNewbVLCbOEksSUB06QoC~mZki0CA2kzf43u1jBo6w6LtHnw7rPe6AajuJXvKHUPMv1LkuEHxGFos9U1s-zdj3Q1FD7NCudiZm0xGP0DF24C74YFkf5f8X2ahgr-qhU009lfzWEYVqvQ12qjwaiMF5-M-TFXBw__"
              alt="Venue photo"
              className="h-48 w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    ),
    reviews: (
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★★★★☆</span>
            <span className="text-sm">(4.2 out of 5 based on 48 reviews)</span>
          </div>
        </div>

        {/* Sample reviews */}
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Sarah Johnson</span>
            <span className="text-yellow-500">★★★★★</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Visited on March 12, 2025
          </p>
          <p className="mt-2">
            Amazing venue! The staff was extremely helpful and the space was
            perfect for our company retreat. Would definitely book again.
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Michael Chen</span>
            <span className="text-yellow-500">★★★☆☆</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Visited on February 28, 2025
          </p>
          <p className="mt-2">
            Good location but parking was a challenge. The venue itself was
            clean and well-maintained. Sound system could use an upgrade.
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Sarah Johnson</span>
            <span className="text-yellow-500">★★★★★</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Visited on March 12, 2025
          </p>
          <p className="mt-2">
            Amazing venue! The staff was extremely helpful and the space was
            perfect for our company retreat. Would definitely book again.
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Michael Chen</span>
            <span className="text-yellow-500">★★★☆☆</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Visited on February 28, 2025
          </p>
          <p className="mt-2">
            Good location but parking was a challenge. The venue itself was
            clean and well-maintained. Sound system could use an upgrade.
          </p>
        </div>
      </div>
    ),
    events: (
      <div className="py-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>

        <div className="grid gap-4">
          <div className="border rounded p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  Abstract Art Exhibition
                </h3>
                <div className="flex gap-2 mt-1">
                  <CiClock2 className="text-blue-700 mt-[2px]" />
                  <p className="text-sm ">
                    Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <SlCalender className="text-blue-700" />
                  <p className="text-sm ">Upcoming events : 4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  Community Theater Performance
                </h3>
                <div className="flex gap-2 mt-1">
                  <CiClock2 className="text-blue-700 mt-[2px]" />
                  <p className="text-sm ">
                    Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <SlCalender className="text-blue-700" />
                  <p className="text-sm ">Upcoming events : 4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  Abstract Art Exhibition
                </h3>
                <div className="flex gap-2 mt-1">
                  <CiClock2 className="text-blue-700 mt-[2px]" />
                  <p className="text-sm ">
                    Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <SlCalender className="text-blue-700" />
                  <p className="text-sm ">Upcoming events : 4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  Abstract Art Exhibition
                </h3>
                <div className="flex gap-2 mt-1">
                  <CiClock2 className="text-blue-700 mt-[2px]" />
                  <p className="text-sm ">
                    Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <SlCalender className="text-blue-700" />
                  <p className="text-sm ">Upcoming events : 4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
      {/* Back Button */}
      <div className="mt-6">
        <Link
          to="/venue"
          className="flex items-center text-blue-800 font-medium"
        >
          <IoIosArrowBack className="mr-1" /> Back to Venue
        </Link>
      </div>

      {/* Banner Image */}
      <div className="relative mt-4">
        <img
          src={venue.photos[0]}
          alt={venue.name}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-6 text-white w-full bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
          <h1 className="text-3xl md:text-4xl font-bold">{venue.name}</h1>
          <div className="flex items-center mt-2">
            <CiLocationOn className="mr-1" />
            <p className="text-lg">{venue.address}</p>
          </div>
        </div>
      </div>

      {/* Rating and Action Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mt-6">
        <div className="flex bg-[#F9E9CC] px-4 py-2 gap-1 rounded-full mb-4 md:mb-0">
          <FaStar className="text-[#E39000] mt-[2px]" />{" "}
          <p className="font-medium">
            4.5 {`(${venue.reviews.length} reviews)`}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center bg-blue-800 text-white px-3 w-[200px] py-2 rounded-full">
            <CiLocationArrow1 className="mr-2 text-2xl" /> Get Direction
          </button>
          <button className="flex items-center justify-center border border-blue-800 text-blue-800 px-6 py-2 rounded-full">
            <BsTelephone className="mr-2" /> Contact
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row mt-8">
        {/* Left Section - Tabs and Content */}
        <div className="w-full md:w-2/3 pr-0 md:pr-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "events"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Events
              </button>
            </nav>
          </div>

          {/* "Write a Review" button */}
          <div className="text-right mt-4">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 border border-blue-300 rounded px-3 py-1.5"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Write a Review
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-2">{contentMap[activeTab]}</div>
        </div>

        {/* Right Section - Sidebar */}
        <div className="w-full md:w-1/3 mt-8 md:mt-[70px]">
          {/* Hours */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="font-semibold">Hours</h2>
            <div className="flex items-start mt-2">
              <CiClock2 className="text-blue-700 mt-1 mr-2" />
              <p className="text-sm">Mon-Fri: 9am-9pm, Sat-Sun: 10am-8pm</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="font-semibold">Contact Information</h2>
            <div className="flex items-center mt-3">
              <BsTelephone className="text-blue-700 mr-2" />
              <p className="text-sm">{venue.contactInformation}</p>
            </div>
            <div className="flex items-center mt-3">
              <PiEnvelopeSimpleThin className="text-blue-700 mr-2" />
              <p className="text-sm">info@venuehubs.com</p>
            </div>
            <div className="flex items-center mt-3">
              <TfiWorld className="text-blue-700 mr-2" />
              <p className="text-sm">www.savanna.org</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="font-semibold">Location</h2>
            <div className="bg-blue-100 rounded-lg p-4 flex justify-center items-center mt-4 h-32">
              <IoLocationOutline className="text-blue-800 text-5xl" />
            </div>
            <p className="text-sm mt-4 text-center">{venue.routeDirection}</p>
            <button className="w-full bg-blue-800 text-white rounded-lg py-3 flex items-center justify-center mt-4">
              <CiLocationArrow1 className="mr-2 text-2xl" /> Get Directions
            </button>
          </div>

          {/* Accessibility Info */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-semibold">Accessibility Info</h2>
            <div className="bg-blue-100 rounded-lg p-3 flex items-center mt-4">
              <MdErrorOutline className="text-blue-800 text-xl mr-2" />
              <p className="text-sm">
                This venue has been verified for accessibility features by our
                team.
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3 flex items-center mt-3">
              <MdErrorOutline className="text-yellow-600 text-xl mr-2" />
              <p className="text-sm">
                Please contact venue for specific accessibility accommodations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venuedetails1;
