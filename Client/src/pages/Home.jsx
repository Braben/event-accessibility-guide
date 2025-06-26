import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      image: "/Grouppic3.jpg",
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
   <section className="w-full flex flex-col items-center justify-center text-center px-4 py-10 sm:py-14 md:py-20 bg-gradient-to-b from-[#F6F7FA] to-[#CED8EA]">
  <h3 className="text-xs sm:text-sm md:text-base font-medium text-[#1E4B9D] bg-[#c6d1e6] rounded-full px-4 py-1 mb-4">
    Discover Accessible Places
  </h3>

  <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-snug text-[#111827]">
    Your Gateway to <span className="text-[#1E4B9D]">Accessible</span> Venues
  </h1>

  <p className="text-xs sm:text-sm md:text-base text-gray-700 mt-3 max-w-md">
    Find and explore venues with detail accessibility information,
    making it easier for everyone to navigate the world with confidence.
  </p>

  {/* Search Bar */}
  <div className="relative w-full max-w-md mt-6 max-w-[690px] px-4 ">
     {/* Search Icon */}
          <IoSearchSharp className="absolute left-8 top-1/2 transform -translate-y-1/2 text-blue-700 text-xl" />

    <input
      type="search"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       onKeyDown={handleKeyPress}
       required
      placeholder="Search restaurants, parks, hotels, and more..."
      className="w-full h-12 pl-10 pr-28 text-sm rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-12 px-4 rounded-r-[50px] bg-[#1E4B9D] text-white text-sm hover:bg-blue-800"
     type="button"
     onClick={handleSearch}>
      Search
    </button>
  </div>

  {/* CTA Button */}
  <button className="mt-6 h-11 px-6 rounded-full bg-[#1E4B9D] text-white text-sm sm:text-base font-semibold flex items-center gap-2 hover:bg-blue-800">
    Explore Accessible Venues
    <FaLongArrowAltRight className="text-white text-sm sm:text-base" />
  </button>

  {/* Stats Section */}
  <div className="grid grid-cols-3 gap-4 mt-10 text-center">
    <div>
      <h2 className="text-[#1E4B9D] font-bold text-sm sm:text-lg">5000+</h2>
      <p className="text-xs sm:text-sm text-gray-600">Accessible Venues</p>
    </div>
    <div>
      <h2 className="text-[#1E4B9D] font-bold text-sm sm:text-lg">15k+</h2>
      <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
    </div>
    <div>
      <h2 className="text-[#1E4B9D] font-bold text-sm sm:text-lg">98%</h2>
      <p className="text-xs sm:text-sm text-gray-600">Satisfaction Rate</p>
    </div>
  </div>
</section>


           {/* About Section */}
      <section id="about" className="w-full max-w-6xl px-6 sm:px-6 md:px-8 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="/Grouppic1.jpg"
              alt="Group picture"
              className="h-auto w-full max-w-[500px] object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-sm sm:text-base md:text-xl font-bold text-[#1E4B9D] bg-[#D2DBEB] rounded-3xl px-4 py-2 inline-block w-fit mx-auto md:mx-0">
              About Us
            </h3>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4">
              Making the world more accessible for everyone
            </h1>
            <p className="text-gray-700 mt-4 text-sm sm:text-base">
              Eventshub is a global self-service platform for live experiences
              that allows anyone to create, share, find, and attend events that
              fuel their passions and enrich their lives. Our platform is
              designed to help individuals with disabilities find accessible
              venues with ease. We're committed to making the world more
              navigable for everyone by providing detailed accessibility
              information.
            </p>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">
              By connecting users to accessibility-friendly venues, we're
              creating a more inclusive world where everyone can enjoy public
              spaces. Join us in our mission to make every venue accessible to
              all.
            </p>
          </div>
        </div>
      </section>

       {/* Key Features */}
<section className="w-full px-4 sm:px-6 py-10 md:py-20 bg-[#F6F7FA]">
  <div className="flex justify-center">
    <h1 className="font-bold text-[#1E4B9D] bg-[#D2DBEB] text-sm sm:text-base md:text-lg px-4 py-1 rounded-full text-center">
      Key Features
    </h1>
  </div>
  <h2 className="font-bold text-xl sm:text-2xl md:text-4xl text-center mt-4 md:mt-8">
    Find Venues By Accessibility Features
  </h2>
  <p className="text-gray-700 text-center px-3 text-xs sm:text-sm md:text-base mt-2 max-w-2xl mx-auto">
    Our platform offers detailed information about various accessibility
    features to help you find the perfect venue for your needs.
  </p>

  <div className="mt-8 md:mt-12 grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {/* Feature Cards */}
    {[
      {
        icon: <TbWheelchair className="h-6 w-6 text-white" />,
        title: "Wheelchair Access",
        desc: "Find venues with ramps, elevators and accessible entrances.",
      },
      {
        icon: <LuBath className="h-6 w-6 text-white" />,
        title: "Accessible Restrooms",
        desc: "Venues with ADA-compliant restrooms facilities.",
      },
      {
        icon: <FaElevator className="h-6 w-6 text-white" />,
        title: "Elevator Access",
        desc: "Multi-level venue with elevator accessibility.",
      },
      {
        icon: <LuSquareParking className="h-6 w-6 text-white" />,
        title: "Accessible Parking",
        desc: "Dedicated parking spaces close to the entrance.",
      },
      {
        icon: <MdOutlineHearing className="h-6 w-6 text-white" />,
        title: "Hearing Assistance",
        desc: "Venues with hearing loops and audio assistance.",
      },
      {
        icon: <IoEyeSharp className="h-6 w-6 text-white" />,
        title: "Visual Aids",
        desc: "Braille signage and high-contrast visual elements.",
      },
    ].map((feature, idx) => (
      <div
        key={idx}
        className="bg-[#E0E0E4] hover:bg-[#1E4B9D] hover:text-white transition duration-300 rounded-xl p-5 shadow-md text-center"
      >
        <div className="bg-[#1E4B9D] w-12 h-12 mx-auto flex items-center justify-center rounded-lg mb-4">
          {feature.icon}
        </div>
        <h3 className="font-bold text-sm sm:text-base">{feature.title}</h3>
        <p className="text-xs sm:text-sm mt-2">{feature.desc}</p>
      </div>
    ))}
  </div>
</section>
      {/* Our Mission */}
      <section className="w-full px-4 sm:px-6 py-10 md:py-20 bg-[#F6F7FA]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 md:mt-20 items-center">
    
    {/* Image - appears first on mobile */}
    <div className="order-1 md:order-2 flex justify-center">
      <img
        src="/Grouppic2.jpg"
        alt="Times Square"
        className="h-auto w-full max-w-[335px] md:max-w-[500px] object-cover rounded-lg shadow-md"
      />
    </div>

    
    <div className="order-2 md:order-1">
      <div className="flex justify-center md:justify-start">
        <h3 className="text-sm sm:text-base md:text-lg text-[#E39000] bg-[#F9E9CC] rounded-full px-4 py-1 font-bold text-center">
          Our Mission
        </h3>
      </div>

      <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-center md:text-left mt-4">
        Creating a More Inclusive
      </h4>
      <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-center md:text-left">
        World Together
      </h4>

      <p className="text-gray-700 mt-4 text-sm sm:text-base text-center md:text-left">
        Our mission is to create a world where accessibility is not an
        afterthought. We're dedicated to providing a reliable, comprehensive
        database of venues with detailed accessibility information.
      </p>

      <p className="text-gray-700 mt-2 text-sm sm:text-base text-center md:text-left">
        We work with businesses and public spaces to improve their accessibility
        features and highlight those that are already doing great work in this
        area.
      </p>
    </div>
  </div>
</section>




         {/* FAQ Section */}
      <section id="faqs" className="w-full max-w-3xl px-6 sm:px-6 py-10 md:py-20">
        <div className="flex justify-center">
          <h1 className="text-sm sm:text-base md:text-lg text-[#1E4B9D] font-bold bg-[#D2DBEB] rounded-full px-4 py-1">
            FAQs
          </h1>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mt-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-center mt-2 mb-6">
          Find answers to common questions about our platform and accessibility features
        </p>

        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="mb-4 border border-gray-150 rounded-lg overflow-hidden  shadow-md"
          >
            <button
              className="w-full flex justify-between items-center px-4 py-3 bg-white-100  hover:bg-gray-200 text-left"
              onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
            >
              <span className="text-sm sm:text-base font-medium">{faq.question}</span>
              <FaChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  faqOpen === faq.id ? "rotate-180" : ""
                }`}
              />
            </button>
            {faqOpen === faq.id && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <p className="text-sm sm:text-base text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>
              
       {/* Testimonials Section */}
<section className="w-full max-w-6xl px-4 sm:px-6 py-10 md:py-20 relative">
  <div className="flex justify-center">
    <h3 className="text-sm sm:text-base md:text-lg text-[#E39000] bg-[#F9E9CC] rounded-full px-4 py-1 font-bold">
      Testimonials
    </h3>
  </div>
  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mt-4">
    What Our Users Say
  </h2>
  <p className="text-xs sm:text-sm md:text-base text-center mt-2 mb-8">
    Hear from people who have used our platform to find accessible venues
  </p>

  <div className="relative flex items-center justify-center">
    <button
      onClick={goToPrevious}
      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#E39000] rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
      aria-label="Previous testimonial"
    >
      <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>

    <div className="flex gap-4 overflow-x-auto px-2 sm:px-4 w-full max-w-4xl">
      {getVisibleTestimonials().map((testimonial) => (
        <div
          key={testimonial.id}
          className="min-w-[220px] max-w-xs bg-gray-100 rounded-lg p-4 shadow-md flex-shrink-0 flex flex-col items-center text-center"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="rounded-full w-12 h-12 object-cover mb-2"
          />
          <h3 className="font-semibold text-sm">{testimonial.name}</h3>
          <div className="flex mt-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${
                  i < testimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs">{testimonial.review}</p>
        </div>
      ))}
    </div>

    <button
      onClick={goToNext}
      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#E39000] rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
      aria-label="Next testimonial"
    >
      <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  </div>
</section>


      {/* Contact Section */}
     <section id="contact" className="w-full px-4 sm:px-6 py-10 md:py-20 bg-white">
  <div className="flex justify-center">
    <h3 className="text-sm sm:text-base md:text-lg text-blue-800 bg-[#CED8EA] rounded-full px-4 py-1 font-bold text-center">
      Contact Us
    </h3>
  </div>

  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mt-4">
    Get in Touch With Our Team
  </h2>
  <p className="text-sm md:text-base text-center text-gray-700 px-5 mt-2 mb-8">
    Have questions or feedback? We'd love to hear from you.
  </p>

  <form
    onSubmit={handleSubmit}
    className="bg-white max-w-3xl mx-auto shadow-md rounded-xl p-6 sm:p-8 border border-gray-200"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Your name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Phone</label>
      <input
        type="tel"
        name="phone"
        placeholder="Your phone number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Message</label>
      <textarea
        name="message"
        placeholder="How can we help you?"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md transition duration-300"
    >
      Send Message
    </button>
  </form>
</section>



    </div>
  ); 
  
};

export default Home;
