import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';



const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [faqOpen, setFaqOpen] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({fullName: '',email: '',phone: '',message: '' });

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    setSearchTerm('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const faqs = [
    { id: 1, question: "How do I register for upcoming events?", answer: "You can register for all our events through our online portal. Simply create an account, browse the available events, and click the 'Register' button." },
    { id: 2, question: "What is the cancellation policy for events?", answer: "Cancellations made at least 30 days before the event date are eligible for a full refund." },
    { id: 3, question: "Are meals provided during all-day events?", answer: "Yes, all full-day events include a catered lunch and refreshments during breaks." },
    { id: 4, question: "How can I access materials after attending an event?", answer: "All presentation slides, handouts, and additional resources will be available through our online portal." }
  ];

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Michael T",
      image: "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      rating: 5,
      review: "The venue itself is such an iconic part of London and easy to get too. The rooms we hired were amazing spaces."
    },
    {
      id: 2,
      name: "Sarah J",
      image: "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
      rating: 4,
      review: "Excellent staff and facilities. Everything was well organized and the event went smoothly. Would definitely recommend."
    },
    {
      id: 3,
      name: "Daniel P",
      image: "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 5,
      review: "Fantastic location with great transport links. The staff were very helpful and accommodating to our needs."
    },
    {
      id: 4,
      name: "Emma K",
      image: "https://t3.ftcdn.net/jpg/03/92/04/00/360_F_392040074_uzTd7AjxvfNaeuDViC9RC4wVo6LhJ6Z4.jpg",
      rating: 4,
      review: "We had a wonderful experience. The audio-visual setup was perfect for our presentation and the catering was delicious."
    },
    {
      id: 5,
      name: "Robert L",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      rating: 5,
      review: "Absolutely brilliant venue. The conference rooms are spacious and the technical support was exceptional."
    }
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
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your server
    alert('Form submitted successfully!');
  };
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center py-16">
        <h1 className="text-4xl font-bold mb-10 text-center">Your Gateway to Accessible Venues</h1>

        <div className="relative w-full max-w-2xl px-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            required
            placeholder="Search restaurants, parks, hotels, and more"
            className="h-15 w-full pr-32 pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="absolute right-4 top-0 h-full bg-black text-white rounded-r-lg hover:bg-indigo-700 px-6"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <button className="h-14 w-44 text-white bg-black rounded-lg font-bold mt-12 hover:bg-indigo-700">
          Explore more Venues
        </button>
      </section>

      {/* About Section */}
      <section className="w-full max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <img 
            src="https://wp.expatexplore.com/wp-content/uploads/2020/01/TimesSquareNYE.jpg" 
            alt="Times Square" 
            className="h-64 w-full object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              Eventshub is a global self-service platform for live experiences that allows anyone to create, share, find, and attend events that fuel their passions and enrich their lives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              Our mission is to bring the world together through live experiences, including music festivals, conferences, community rallies, and fundraisers.
            </p>
          </div>
          <img 
            src="https://wp.expatexplore.com/wp-content/uploads/2020/01/TimesSquareNYE.jpg" 
            alt="Times Square" 
            className="h-64 w-full object-cover rounded-lg order-1 md:order-2"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform duration-300 ${faqOpen === faq.id ? 'transform rotate-180' : ''}`}
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
        <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
        
        <div className="flex gap-7 items-center justify-center">
          <button 
            onClick={goToPrevious} 
            className="absolute left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
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
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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
            className="absolute right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
        
       
      <div className="max-w-4xl mx-auto p-6">
        <h1 className='font-bold mb-8 text-3xl items-center pl-[100px]'>Get in Touch With Team </h1>
      <div className=" p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Name and Email side by side with flex - this is explicitly set to always be flex-row */}
          <div className="flex flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
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
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
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
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
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