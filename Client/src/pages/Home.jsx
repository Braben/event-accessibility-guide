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
      <section className="w-full flex flex-col items-center py-16 bg-gradient-to-t from-[#CED8EA] to-[#F6F7FA]">
        <h3 className="text-blue-900 bg-[#c6d1e6] text-xl rounded-full font-medium py-2 px-4">
          Discover Accessible Places
        </h3>
        <div className="flex flex-col items-center gap-[32px] m-10">
          <h1 className="text-4xl font-bold mb-5 text-center">
            Your Gateway to <span className="text-[#1E4B9D]">Accessible</span>{" "}
            Venues
          </h1>
          <p>
            Find and explore venues with detailed accessibility information,
            <br />
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

        <button className=" flex justify-center items-center gap-4 h-[59px] w-[401px] text-white bg-[#1E4B9D] px-4 py-2 rounded-full mt-10 hover:bg-indigo-700">
          <p className="text-[18px] font-bold">Explore more Venues </p>
          <FaLongArrowAltRight className="text-white w-6 mt-[6px]" />
        </button>

        <div className="flex justify-center w-[883px] h-[118px] mt-14 gap-24">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-[#1E4B9D] font-bold text-4xl">5000+</h1>
            <p className="">Accessible Venues</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-[#1E4B9D] font-bold text-4xl">15k</h1>{" "}
            <p className="">Active Users</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-[#1E4B9D] font-bold text-4xl">98%</h1>{" "}
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-5xl px-4 py-16">
        <div className="grid  md:grid-cols-2  mb-16">
          <img
            src="https://s3-alpha-sig.figma.com/img/e1b3/bb7e/57199d0be70210ec773da038040535f2?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pX3f5M3lRSvR3c8dWGkb1IU44HcIfhjwBnusIIUHBSqlHm98lyNRp3eeLlhe-CWN8MYKgi8-tl-VZ8QOXo67YKixDyNKwghx3RR6qaPRZrwNV0tmYj6je~bY59QA8Gn3Iy3d3KJI~M-1FmkaEwXU2dyn1duf-EndNB6JqeWTvKTQiO7Z6XsjaR83Q3h5TOcEtLYrSxzhc8tBFQnNLnONvjSGiJuHsPbw47T32yybu0C~nfpXPYpIJCik~g1BiXIK4QL0NIDyw0l9i6WFkWDAy1G2ItLQnygb8g1au0ijScquW5Ab43Yq0iZYRAvpQv8WOduaAZdlU08rAMjRuUXhhg__"
            alt="Group picture"
            className="h-70 w-[325px] object-cover rounded-lg ml-30 mt-13"
          />
          <div className="flex-col">
            <h3 className="text-2xl font-bold mb-4 text-[#1E4B9D] bg-[#D2DBEB] h-11 w-35 p-1 pl-4 rounded-3xl">
              About Us
            </h3>
            <h1 className="text-2xl font-bold">Making the world more </h1>
            <h1 className="text-2xl font-bold mb-4">
              accessible for everyone{" "}
            </h1>

            <p className="text-gray-700 mb-4">
              Eventshub is a global self-service platform for live experiences
              that allows anyone to create, share, find, and attend events that
              fuel their passions and enrich their lives.Our platform is
              designed to help individuals with disabilities find accessible
              venues with ease. We're committed to making the world more
              navigable for everyone by providing detailed accessibility
              information.
            </p>
            <p className="text-gray-700">
              By connecting users to accessibility-friendly venues, we're
              creating a more inclusive world where everyone can enjoy public
              spaces. Join us in our mission to make every venue accessible to
              all.
            </p>
          </div>
        </div>

        {/*Key features*/}
        <div className="flex-col justify-center items-center mt-40">
          <h1 className="font-bold text-blue-800 bg-[#D2DBEB] text-xl ml-105 p-1 pl-[28px] rounded-4xl h-[40px] w-[180px]">
            Key Features
          </h1>
          <h1 className=" flex font-bold text-4xl mt-10 ml-50 ">
            Find Venues By Accessibility Features
          </h1>
          <p className="text-gray-700  mt-2 ml-51">
            Our platform offers detailed information about various accessibility
            features to help you{" "}
          </p>
          <p className="text-gray-700 ml-94">
            find the perfect venue for your needs
          </p>

          <div className="mt-13   ">
            {/*first col*/}
            <div className="flex gap-7 justify-center items-center  ml-5">
              <div className=" flex-col h-[200px] w-[420px] bg-[#E0E0E4] rounded-xl p-6 shadow-lg  hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-12 w-13 p-2 pl-3 rounded-lg">
                  <TbWheelchair className="h-[25px] w-[25px] text-white" />
                </div>
                <h1 className=" text-black-700 mt-3 font-bold">
                  Wheelchair Access
                </h1>
                <p className="text-sm text-gray-700">
                  {" "}
                  Find venues with ramps elevators and
                </p>
                <p className="text-sm text-gray-700">accessible entrances.</p>
              </div>

              <div className="h-[200px] w-[420px] bg-[#E0E0E4] rounded-xl p-6 shadow-lg  hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-12 w-13 p-2 pl-3 rounded-lg">
                  <LuBath className="h-[25px] w-[25px] text-white" />
                </div>
                <h1 className=" text-black-700 mt-3 font-bold">
                  Acessible Restrooms
                </h1>
                <p className="text-sm text-gray-700">
                  {" "}
                  Venues and ADA-compliant restrooms
                </p>
                <p className="text-sm text-gray-700">facilities.</p>
              </div>

              <div className="h-[200px] w-[420px] bg-[#E0E0E4] rounded-xl p-6 shadow-lg  hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-12 w-13 p-2 pl-3 rounded-lg">
                  <FaElevator className="h-[25px] w-[25px] text-white" />
                </div>
                <h1 className=" text-black-700 mt-3 font-bold">
                  Elevator Access
                </h1>
                <p className="text-sm text-gray-700">
                  {" "}
                  Multi-level venue with an elevator
                </p>
                <p className="text-sm text-gray-700">accessibility.</p>
              </div>
            </div>

            {/*second col*/}
            <div className="flex gap-7 mt-6 justify-center items-center ml-5">
              <div className="h-[200px] w-[420px] bg-[#E0E0E4] rounded-xl p-6 shadow-lg  hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-12 w-13 p-2 pl-3 rounded-lg">
                  <LuSquareParking className="h-[25px] w-[25px] text-white" />
                </div>
                <h1 className=" text-black-700 mt-3 font-bold">
                  {" "}
                  Accessible parking
                </h1>
                <p className="text-sm text-gray-700">
                  {" "}
                  Dedicated parking spaces close to the{" "}
                </p>
                <p className="text-sm text-gray-700">entrance.</p>
              </div>

              <div className="h-[200px] w-[420px] bg-[#E0E0E4] rounded-xl p-6 shadow-lg  hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-12 w-13 p-2 pl-3 rounded-lg">
                  <MdOutlineHearing className="h-[25px] w-[25px] text-white" />
                </div>
                <h1 className=" text-black-700 mt-3 font-bold">
                  Hearing Assistance
                </h1>
                <p className="text-sm text-gray-700">
                  {" "}
                  Venues with hearing loops and audio
                </p>
                <p className="text-sm text-gray-700">assistance.</p>
              </div>

              <div className="h-[200px] w-[420px] bg-[#E0E0E4] rounded-xl p-6 shadow-lg  hover:bg-blue-500 hover:text-white transition-all duration-300">
                <div className="bg-[#1E4B9D] h-12 w-13 p-3 pl-[14px] rounded-lg">
                  <IoEyeSharp className="h-[25px] w-[25px] text-white" />
                </div>
                <h1 className=" text-black-700 mt-3 font-bold">Visual Aids</h1>
                <p className="text-sm text-gray-700">
                  Braille signage and high-contrast visual
                </p>
                <p className="text-sm text-gray-700">elements.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center mt-52 ml-[140px]">
          <div className="order-1 md:order-1">
            <h2 className="text-2xl text-[#E39000] rounded-3xl h-[45px] w-[170px] p-1 pl-4 bg-[#F9E9CC] font-bold mb-4">
              Our Mission
            </h2>
            <h4 className="text-2xl font-bold">Creating a More Inclusive </h4>
            <h4 className="text-2xl font-bold">World Together</h4>
            <p className="text-gray-700 mt-6">
              Our mission is to create a world where accessibility is not an
              afterthought. We're dedicated to providing a reliable,
              comprehensive database of venues with detailed accessibility
              information.
            </p>
            <p className="text-gray-700 mt-4">
              {" "}
              We work with businesses and public spaces to improve their
              accessibility features and highlight those that are already doing
              great work in this area.
            </p>
          </div>
          <img
            src="https://s3-alpha-sig.figma.com/img/bb8c/1e37/ec1aa836b2735296a80f3b866ddc97c5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T0OnKoGd2xNDZkcrQaqyaYB5od2ggaKpUtgSHnwZlEy2DTdsbpkuHZ~0g7OOG571~3SOT2FVV8LA8tuoZRPPer-0wVP-EV4KQTxWjmLJL1~ew1TCqTr53Yhc7gVnOAH-1yDwLNWli4a3OIBXY2sbfKoR9GMoYYPCeyBkA4TKKtCo5kuZZWgK1BWDhMxR1ZB3hqtIfKd2jAM6IPEXQZvKVTjvzsmt6PN7hzq7cwp0TUcDwB2P9zMHTiBcD1vJaCguQLXQx46Lw2v7PppaC26SrRpbuw9RdQhugEInJa1UHawmBwQ9YUZJDD0BiGZuyJtdirTRiEmtqg0EbmPlvwiwuA__"
            alt="Times Square"
            className="order-2 md:order-2 h-70 w-[335px] object-cover rounded-lg mt-10"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl px-4 py-16">
        <h1 className="text-[#1E4B9D] text-[23px] h-[45px] w-[95px] p-1 pl-5 rounded-2xl bg-[#D2DBEB] font-bold ml-[325px]">
          FAQs
        </h1>
        <h2 className="text-3xl font-bold mb-6 text-center mt-5">
          Frequently Asked Questions
        </h2>
        <p className="mt-6 ml-[100px]">
          Find answers to common questions about our platform and accessibility
          features
        </p>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden mt-11"
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
            >
              <span className="font-medium">{faq.question}</span>
              <FaChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  faqOpen === faq.id ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {faqOpen === faq.id && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl px-4 py-16 relative">
        <h3 className="text-[#E39000] text-[18px] bg-[#F9E9CC] h-[38px] w-[143px] rounded-2xl pl-5 p-1 ml-88 mb-5 font-bold">
          Testimonials
        </h3>
        <h2 className="text-2xl font-bold text-center text-[31px] ">
          What Our Users Say
        </h2>
        <p className="mt-3 ml-46">
          Hear from people who have used our platform to find accessible venues
        </p>

        <div className="flex gap-7 items-center justify-center mt-17">
          <button
            onClick={goToPrevious}
            className="absolute left-4 bg-[#E39000] rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          {getVisibleTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className="h-44 w-64 bg-gray-100 rounded-lg flex-col p-5"
            >
              <div className="flex gap-3">
                <img
                  className="rounded-full h-12 w-12"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="flex flex-col">
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm mt-3">{testimonial.review}</p>
            </div>
          ))}

          <button
            onClick={goToNext}
            className="absolute right-4 bg-[#E39000] rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6 mt-16">
        <h1 className="text-[rgb(30,75,157)] text-[19px] font-bold h-[38px] w-[140px] p-[4px] pl-[19px] ml-45 mb-5 rounded-2xl bg-[#D2DBEB]">
          Contact Us
        </h1>
        <h1 className="font-bold mb-6 text-[31px] items-center pl-[48px]">
          Get in Touch With Our Team{" "}
        </h1>
        <p className="mb-14 text-[13px] ml-22">
          {" "}
          Have questions or feedback ? we'd love to hear from you{" "}
        </p>
        <div className=" p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Name and Email side by side with flex - this is explicitly set to always be flex-row */}
            <div className="flex flex-row gap-4 mb-6">
              <div className="flex-1">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-medium mb-2"
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
                  className="w-full px-4 py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
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
                  className="w-full px-4 py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Phone number */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
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
                className="w-full px-4 py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
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
                className="w-full px-4 py-3 rounded border bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 w-full text-white font-medium rounded hover:bg-violet-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
