import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEventNote } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import Venuedetails1 from "../pages/Venuedetails1";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const {
    name,
    description,
    address,
    accessibilityOptions = [],
    photos,
    rating = 4.5,
    openingHours = "Mon-Fri: 9am-9pm, Sat-Sun: 10am-8pm",
  } = venue;

  const displayedTags = accessibilityOptions.slice(0, 2);
  const remainingTags = accessibilityOptions.length - displayedTags.length;

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden hover:shadow-md transition duration-200 flex flex-col h-full">
      <div className="relative">
        <img
          src={
            photos ||
            "https://s3-alpha-sig.figma.com/img/fb68/24e5/442ee0854ceb471149eea96ea69fea05?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rgUajMIm1qLJR9fSFeN64DydRF0f6w~gvYKxMVfFmUs04h8tQe60X9hRQv0SQgp1A6gdeFaSaiOYn0N~r-84jsZr3ItERp6-NAe60Bdutgsg2XCtj2pimM0g~FP2ePS3TU4oC2p0kjINPSwxVYe~Mz5P1EYzF5kpo54DB~vZGEifpg~0dyf98c3laGtllWi8U3PzksCt08JXnCXN6kLuGmmEKJvhL1QAabgqH0Psr10K-WxZMY0kN3Kn3i~qpa0uc7sMpjVOz5YcZGtE2YUw-~sZ3SH-o7JeehIkp90KSi4yjbahVKwsLSL9zQml~r9arOYBXXhktHDNUGDMxLnnfg__"
          }
          alt={name}
          className="w-[515px] h-[280px] object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow">
          <FaStar className="text-yellow-500" />
          {rating}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600 text-[20px] font-normal mt-2">
            {description}
          </p>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p className="flex text-[20px] font-normal items-start gap-2">
            <CiLocationOn className="text-blue-800 text-lg mt-1" />
            {address}
          </p>
          <p className="flex text-xl font-normal items-start gap-2">
            <MdOutlineEventNote className="text-blue-800 text-lg mt-1" />
            Upcoming events: 3
          </p>
          <p className="flex text-[20px] font-normal items-start gap-2">
            <IoTimeOutline className="text-blue-800 text-lg mt-1" />
            {openingHours}
          </p>
        </div>

        <div className="">
          {accessibilityOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {displayedTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {remainingTags > 0 && (
                <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  +{remainingTags} more
                </span>
              )}
            </div>
          )}
        </div>

        <button
          // onClick={() => navigate(`/venues/${venue.id}`)}
          onClick={() =>
            navigate(`/venues/${venue.name}`, { state: { venue } })
          }
          // onClick={() => navigate("/venues/venuedetails1")} // Navigates to VenueDetails1 page
          className="mt-auto bg-black text-white text-sm py-3 rounded-lg w-full hover:bg-gray-900 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
