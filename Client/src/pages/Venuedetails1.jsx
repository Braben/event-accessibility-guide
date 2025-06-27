import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewsByVenue } from "../slicers/reviewSlicer"; // import thunk
import { useEffect } from "react";

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
import { BiBath, BiBlanket } from "react-icons/bi";
import { LuSquareParking } from "react-icons/lu";
import { IoEarSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./ReviewModal";
import { UserContext } from "../context/UserContext";

import { useLocation, useParams } from "react-router-dom";

const Venuedetails1 = () => {
  const { userDetails } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("overview");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const events = useSelector((state) => state.events.events) || [];
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();
  // console.log(events);
  // console.log(events.startDate);

  // Inside the component

  const location = useLocation();
  const { venue } = location.state || {};
  const { id } = useParams(); // Optional if you need the slug

  useEffect(() => {
    if (venue?.id) {
      dispatch(fetchReviewsByVenue(venue.id));
    }
  }, [dispatch, venue?.id]);

  console.log(venue.reviews);

  if (!venue) {
    return <div className="p-8 text-red-500 text-xl">Venue not found.</div>;
  }

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
          {venue.accessibilityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center mt-2">
              <div className="bg-blue-200 rounded-full h-11 w-11 flex items-center justify-center">
                <TbWheelchair className="text-blue-800 text-2xl" />
              </div>
              <div className="ml-4">
                <h1 className="font-bold">{feature.category}</h1>
                <p className="text-sm mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* photos */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Photos</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {venue.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="h-48 w-full object-cover rounded-lg"
              />
            ))}
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
            <span className="text-sm">
              {console.log(venue.reviews.user)}
              (4.2 out of 5 based on {venue.reviews.length} reviewssssss)
            </span>
          </div>
        </div>
        {/* Sample reviews */}
        {/* Map dynamic reviews */}
        {console.log(reviews)}
        {venue.reviews.length === 0 ? (
          <p className="text-gray-600">
            No reviews yet. Be the first to leave one!
          </p>
        ) : (
          venue.reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  {review.user?.firstname
                    ? `${review.user.firstname} ${review.user.lastname || ""}`
                    : "Anonymous"}
                </span>

                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Visited on {new Date(review.dateCreated).toLocaleDateString()}
              </p>
              <p className="mt-2">{review.comments}</p>
            </div>
          ))
        )}
      </div>
    ),
    events: (
      <div className="py-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        {events.length === 0 ? (
          "No events scheduled"
        ) : (
          <div className="grid gap-4">
            {/* Event  */}
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <CiClock2 className="text-blue-700 mt-[2px]" />
                      <p className="text-sm ">
                        {/* Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm */}
                        {dayjs(event.startDate).format(
                          "ddd, DD MMMM, YYYY"
                        )} - {dayjs(event.endDate).format("ddd, DD MMMM, YYYY")}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <SlCalender className="text-blue-700" />
                      <p className="text-sm ">
                        Upcoming events : {event.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        venueId={venue.id}
        venue={venue}
        userId={userDetails?.id} // From Redux or context
        user={userDetails?.firstname}
      />

      {/* Back Button */}
      <div className="mt-6">
        <Link
          to="/venues"
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
          <button
            className="flex items-center justify-center bg-blue-800 text-white px-3 w-[200px] py-2 rounded-full"
            onClick={() => {
              if (venue?.address) {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    venue.address
                  )}`,
                  "_blank"
                );
              } else {
                alert("Address not available.");
              }
            }}
          >
            <CiLocationArrow1 className="mr-2 text-2xl" /> Get Direction
          </button>

          <button
            className="flex items-center justify-center border border-blue-800 text-blue-800 px-6 py-2 rounded-full"
            onClick={() => {
              window.location.href = `tel:${venue.contactInformation.replace(
                /\s/g,
                ""
              )}`;
            }}
          >
            <BsTelephone className="mr-2" />
            Contact
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
              <p className="text-sm">
                info@{venue.name.replace(/\s+/g, "").toLowerCase()}.com
              </p>
            </div>
            <div className="flex items-center mt-3">
              <TfiWorld className="text-blue-700 mr-2" />
              <p className="text-sm">
                www.{venue.name.replace(/\s+/g, "").toLowerCase()}.com
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="font-semibold">Location</h2>
            <div className="bg-blue-100 rounded-lg p-4 flex justify-center items-center mt-4 h-32">
              <IoLocationOutline className="text-blue-800 text-5xl" />
            </div>
            <p className="text-sm mt-4 text-center">{venue.routeDirection}</p>
            <button
              className="w-full bg-blue-800 text-white rounded-lg py-3 flex items-center justify-center mt-4"
              onClick={() => {
                if (venue?.address) {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      venue.address
                    )}`,
                    "_blank"
                  );
                } else {
                  alert("Address not available.");
                }
              }}
            >
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
