import React, { useState } from "react";
import { TbWheelchair } from "react-icons/tb";
import { LuBath } from "react-icons/lu";
import { FaElevator } from "react-icons/fa6";
import { LuSquareParking } from "react-icons/lu";
import { MdOutlineHearing } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaLongArrowAltRight, FaChevronDown, FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [faqOpen, setFaqOpen] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    setSearchTerm("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const faqs = [
    {
      id: 1,
      question: "How do I register for upcoming events?",
      answer:
        "You can register for all our events through our online portal. Simply create an account, browse the available events, and click the 'Register' button.",
    },
    {
      id: 2,
      question: "What is the cancellation policy for events?",
      answer:
        "Cancellations made at least 30 days before the event date are eligible for a full refund.",
    },
    {
      id: 3,
      question: "Are meals provided during all-day events?",
      answer:
        "Yes, all full-day events include a catered lunch and refreshments during breaks.",
    },
    {
      id: 4,
      question: "How can I access materials after attending an event?",
      answer:
        "All presentation slides, handouts, and additional resources will be available through our online portal.",
    },
  ];

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Michael T",
      image:
        "https://s3-alpha-sig.figma.com/img/3648/41f4/9f905d165f939cc17d81d06275561278?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjcR6o-WUgss7~ejIxLum3eA5kUs9ZrQF~cTOGEYKtWGAzIQWVQh-wPMz9MAeLYQ5qDKY4PTW080iR2ckuxjHRpoQ5YKJhzaXiCvxuIsrNKQB5ac3ZFSWaqjJhpwYHNk3I8QCihxQWVudjisAe9FWmolZP65EzK~S0ujsQJV4qoAe9biBtrWPz~2G78KBxaJB2B0OOynGvTiPPfTW2Ph16BEnMUnLf7-e8~ZaoI7fkT2286wCOHhh-6ZtMoq5xXYCoFsjV2Aa7t-8mnM8r83jUb8IxwTc3Ei9aMqmS9EAKFPBwT7d4jFXBQYRI0wf7cwBrmYrIC0dshExJJcJXnYdw__",
      rating: 5,
      review:
        "The venue itself is such an iconic part of London and easy to get too. The rooms we hired were amazing spaces.",
    },
    {
      id: 2,
      name: "Sarah J",
      image:
        "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
      rating: 4,
      review:
        "Excellent staff and facilities. Everything was well organized and the event went smoothly. Would definitely recommend.",
    },
    {
      id: 3,
      name: "Daniel P",
      image:
        "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 5,
      review:
        "Fantastic location with great transport links. The staff were very helpful and accommodating to our needs.",
    },
    {
      id: 4,
      name: "Emma K",
      image:
        "https://t3.ftcdn.net/jpg/03/92/04/00/360_F_392040074_uzTd7AjxvfNaeuDViC9RC4wVo6LhJ6Z4.jpg",
      rating: 4,
      review:
        "We had a wonderful experience. The audio-visual setup was perfect for our presentation and the catering was delicious.",
    },
    {
      id: 5,
      name: "Robert L",
      image:
        "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      rating: 5,
      review:
        "Absolutely brilliant venue. The conference rooms are spacious and the technical support was exceptional.",
    },
  ];

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3;
    const wrappedTestimonials = [...testimonials, ...testimonials];
    return wrappedTestimonials.slice(startIndex, endIndex);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your server
    alert("Form submitted successfully!");
  };
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center py-8 md:py-16 bg-gradient-to-t from-[#CED8EA] to-[#F6F7FA] px-4">
        <h3 className="text-blue-900 bg-[#c6d1e6] text-base md:text-xl rounded-full font-medium py-2 px-4">
          Discover Accessible Places
        </h3>
        <div className="flex flex-col items-center gap-4 md:gap-8 m-4 md:m-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-5 text-center">
            Your Gateway to <span className="text-[#1E4B9D]">Accessible</span>{" "}
            Venues
          </h1>
          <p className="text-center text-sm md:text-base">
            Find and explore venues with detailed accessibility information,
            making it easier for everyone to navigate the world with confidence
          </p>
        </div>

        <div className="relative w-full max-w-[690px] px-4">
          {/* Search Icon */}
          <IoSearchSharp className="absolute left-8 top-1/2 transform -translate-y-1/2 text-blue-700 text-xl" />

          {/* Search Input */}
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            required
            placeholder="Search restaurants, parks, hotels, and more..."
            className="h-12 w-full pl-12 pr-28 text-sm shadow-xl rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Search Button */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 bg-[#1E4B9D] text-white rounded-r-[64px] hover:bg-indigo-700 px-6 font-poppins"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <button className="flex justify-center items-center gap-4 h-12 md:h-[59px] w-full md:w-[401px] text-white bg-[#1E4B9D] px-4 py-2 rounded-full mt-6 md:mt-10 hover:bg-indigo-700 mx-4">
          <p className="text-base md:text-lg font-bold">Explore more Venues </p>
          <FaLongArrowAltRight className="text-white w-5 md:w-6" />
        </button>

        <div className="flex flex-col md:flex-row justify-center md:w-[883px] mt-8 md:mt-14 gap-6 md:gap-24">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-[#1E4B9D] font-bold text-2xl md:text-4xl">
              5000+
            </h1>
            <p className="text-sm md:text-base">Accessible Venues</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-[#1E4B9D] font-bold text-2xl md:text-4xl">
              15k
            </h1>
            <p className="text-sm md:text-base">Active Users</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-[#1E4B9D] font-bold text-2xl md:text-4xl">
              98%
            </h1>
            <p className="text-sm md:text-base">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-5xl px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-16">
          <div className="flex justify-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/e1b3/bb7e/57199d0be70210ec773da038040535f2?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pX3f5M3lRSvR3c8dWGkb1IU44HcIfhjwBnusIIUHBSqlHm98lyNRp3eeLlhe-CWN8MYKgi8-tl-VZ8QOXo67YKixDyNKwghx3RR6qaPRZrwNV0tmYj6je~bY59QA8Gn3Iy3d3KJI~M-1FmkaEwXU2dyn1duf-EndNB6JqeWTvKTQiO7Z6XsjaR83Q3h5TOcEtLYrSxzhc8tBFQnNLnONvjSGiJuHsPbw47T32yybu0C~nfpXPYpIJCik~g1BiXIK4QL0NIDyw0l9i6WFkWDAy1G2ItLQnygb8g1au0ijScquW5Ab43Yq0iZYRAvpQv8WOduaAZdlU08rAMjRuUXhhg__"
              alt="Group picture"
              className="h-auto w-full max-w-[568px] object-cover rounded-lg"
            />
          </div>
          <div className="flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1E4B9D] bg-[#D2DBEB] h-11 w-35 p-1 pl-4 rounded-3xl inline-block">
              About Us
            </h3>
            <h1 className="text-xl md:text-2xl font-bold">
              Making the world more{" "}
            </h1>
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              accessible for everyone{" "}
            </h1>

            <p className="text-gray-700 mb-4 text-sm md:text-base">
              Eventshub is a global self-service platform for live experiences
              that allows anyone to create, share, find, and attend events that
              fuel their passions and enrich their lives. Our platform is
              designed to help individuals with disabilities find accessible
              venues with ease. We're committed to making the world more
              navigable for everyone by providing detailed accessibility
              information.
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              By connecting users to accessibility-friendly venues, we're
              creating a more inclusive world where everyone can enjoy public
              spaces. Join us in our mission to make every venue accessible to
              all.
            </p>
          </div>
        </div>

        {/*Key features*/}
        <div className="flex-col justify-center items-center mt-16 md:mt-40">
          <div className="flex justify-center">
            <h1 className="font-bold text-blue-800 bg-[#D2DBEB] text-lg md:text-xl p-1 px-4 rounded-full h-auto w-auto md:h-[40px] md:w-[180px] text-center">
              Key Features
            </h1>
          </div>
          <h1 className="font-bold text-2xl md:text-4xl mt-6 md:mt-10 text-center">
            Find Venues By Accessibility Features
          </h1>
          <p className="text-gray-700 mt-2 text-center text-sm md:text-base">
            Our platform offers detailed information about various accessibility
            features to help you find the perfect venue for your needs
          </p>

          <div className="mt-8 md:mt-12">
            {/*features grid*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="flex-col h-auto md:h-[200px] w-full bg-[#E0E0E4] rounded-xl p-4 md:p-6 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-10 w-10 md:h-12 md:w-12 p-2 rounded-lg flex items-center justify-center">
                  <TbWheelchair className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h1 className="text-black-700 mt-3 font-bold">
                  Wheelchair Access
                </h1>
                <p className="text-xs md:text-sm text-gray-700">
                  Find venues with ramps, elevators and accessible entrances.
                </p>
              </div>

              <div className="flex-col h-auto md:h-[200px] w-full bg-[#E0E0E4] rounded-xl p-4 md:p-6 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-10 w-10 md:h-12 md:w-12 p-2 rounded-lg flex items-center justify-center">
                  <LuBath className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h1 className="text-black-700 mt-3 font-bold">
                  Accessible Restrooms
                </h1>
                <p className="text-xs md:text-sm text-gray-700">
                  Venues with ADA-compliant restrooms facilities.
                </p>
              </div>

              <div className="flex-col h-auto md:h-[200px] w-full bg-[#E0E0E4] rounded-xl p-4 md:p-6 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-10 w-10 md:h-12 md:w-12 p-2 rounded-lg flex items-center justify-center">
                  <FaElevator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h1 className="text-black-700 mt-3 font-bold">
                  Elevator Access
                </h1>
                <p className="text-xs md:text-sm text-gray-700">
                  Multi-level venue with elevator accessibility.
                </p>
              </div>

              <div className="flex-col h-auto md:h-[200px] w-full bg-[#E0E0E4] rounded-xl p-4 md:p-6 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-10 w-10 md:h-12 md:w-12 p-2 rounded-lg flex items-center justify-center">
                  <LuSquareParking className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h1 className="text-black-700 mt-3 font-bold">
                  Accessible parking
                </h1>
                <p className="text-xs md:text-sm text-gray-700">
                  Dedicated parking spaces close to the entrance.
                </p>
              </div>

              <div className="flex-col h-auto md:h-[200px] w-full bg-[#E0E0E4] rounded-xl p-4 md:p-6 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-10 w-10 md:h-12 md:w-12 p-2 rounded-lg flex items-center justify-center">
                  <MdOutlineHearing className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h1 className="text-black-700 mt-3 font-bold">
                  Hearing Assistance
                </h1>
                <p className="text-xs md:text-sm text-gray-700">
                  Venues with hearing loops and audio assistance.
                </p>
              </div>

              <div className="flex-col h-auto md:h-[200px] w-full bg-[#E0E0E4] rounded-xl p-4 md:p-6 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-10 w-10 md:h-12 md:w-12 p-2 rounded-lg flex items-center justify-center">
                  <IoEyeSharp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h1 className="text-black-700 mt-3 font-bold">Visual Aids</h1>
                <p className="text-xs md:text-sm text-gray-700">
                  Braille signage and high-contrast visual elements.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 md:mt-52 items-center">
          <div className="order-2 md:order-1">
            <div className="flex justify-center md:justify-start">
              <h3 className="text-base md:text-lg text-[#E39000] bg-[#F9E9CC] h-auto w-auto rounded-full px-4 py-1 font-bold text-center">
                Our Mission
              </h3>
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-center md:text-left">
              Creating a More Inclusive{" "}
            </h4>
            <h4 className="text-xl md:text-2xl font-bold text-center md:text-left">
              World Together
            </h4>
            <p className="text-gray-700 mt-4 md:mt-6 text-sm md:text-base">
              Our mission is to create a world where accessibility is not an
              afterthought. We're dedicated to providing a reliable,
              comprehensive database of venues with detailed accessibility
              information.
            </p>
            <p className="text-gray-700 mt-2 md:mt-4 text-sm md:text-base">
              We work with businesses and public spaces to improve their
              accessibility features and highlight those that are already doing
              great work in this area.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/bb8c/1e37/ec1aa836b2735296a80f3b866ddc97c5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T0OnKoGd2xNDZkcrQaqyaYB5od2ggaKpUtgSHnwZlEy2DTdsbpkuHZ~0g7OOG571~3SOT2FVV8LA8tuoZRPPer-0wVP-EV4KQTxWjmLJL1~ew1TCqTr53Yhc7gVnOAH-1yDwLNWli4a3OIBXY2sbfKoR9GMoYYPCeyBkA4TKKtCo5kuZZWgK1BWDhMxR1ZB3hqtIfKd2jAM6IPEXQZvKVTjvzsmt6PN7hzq7cwp0TUcDwB2P9zMHTiBcD1vJaCguQLXQx46Lw2v7PppaC26SrRpbuw9RdQhugEInJa1UHawmBwQ9YUZJDD0BiGZuyJtdirTRiEmtqg0EbmPlvwiwuA__"
              alt="Times Square"
              className="h-auto w-full max-w-[335px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl px-4 py-8 md:py-16">
        <div className="flex justify-center">
          <h1 className="text-lg md:text-xl text-[#1E4B9D] h-auto w-auto p-1 px-4 rounded-full bg-[#D2DBEB] font-bold text-center">
            FAQs
          </h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center mt-4 md:mt-5">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-sm md:text-base mb-6 md:mt-6">
          Find answers to common questions about our platform and accessibility
          features
        </p>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden mt-4 md:mt-6"
          >
            <button
              className="w-full flex justify-between items-center p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
            >
              <span className="font-medium text-sm md:text-base">
                {faq.question}
              </span>
              <FaChevronDown
                className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${
                  faqOpen === faq.id ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {faqOpen === faq.id && (
              <div className="p-3 md:p-4 border-t border-gray-200 bg-white">
                <p className="text-gray-700 text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl px-4 py-8 md:py-16 relative">
        <div className="flex justify-center">
          <h3 className="text-base md:text-lg text-[#E39000] bg-[#F9E9CC] h-auto w-auto rounded-full px-4 py-1 font-bold text-center">
            Testimonials
          </h3>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-center mt-4">
          What Our Users Say
        </h2>
        <p className="text-center text-sm md:text-base mt-2 md:mt-3 mb-8">
          Hear from people who have used our platform to find accessible venues
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <button
            onClick={goToPrevious}
            className="md:absolute md:left-4 bg-[#E39000] rounded-full p-2 shadow-md hover:bg-gray-100 z-10 mb-4 md:mb-0"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto w-full md:w-auto px-4">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="h-auto md:h-44 w-full md:w-64 bg-gray-100 rounded-lg flex-col p-4 md:p-5 flex-shrink-0"
              >
                <div className="flex gap-3">
                  <img
                    className="rounded-full h-10 w-10 md:h-12 md:w-12"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="flex flex-col">
                    <h3 className="font-medium text-sm md:text-base">
                      {testimonial.name}
                    </h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs md:text-sm mt-3">{testimonial.review}</p>
              </div>
            ))}
          </div>

          <button
            onClick={goToNext}
            className="md:absolute md:right-4 bg-[#E39000] rounded-full p-2 shadow-md hover:bg-gray-100 z-10 mt-4 md:mt-0"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6 mt-8 md:mt-16">
        <div className="flex justify-center">
          <h1 className="text-base md:text-lg text-[#1E4B9D] font-bold h-auto w-auto p-1 px-4 rounded-full bg-[#D2DBEB] text-center">
            Contact Us
          </h1>
        </div>
        <h1 className="font-bold mb-2 md:mb-6 text-xl md:text-2xl text-center mt-4">
          Get in Touch With Our Team
        </h1>
        <p className="mb-6 md:mb-14 text-xs md:text-sm text-center">
          Have questions or feedback? We'd love to hear from you
        </p>
        <div className="p-4 md:p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Name and Email - responsive layout */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
              </div>
            </div>

            {/* Phone number */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="5"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm md:text-base"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 w-full text-white font-medium rounded hover:bg-violet-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
