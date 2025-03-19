import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Venues from './pages/Venues';
import About from './pages/About';
import FAQS from './pages/FAQS';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQS" element={<FAQS />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
