<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
<<<<<<< HEAD
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
=======

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
  }, []);

  // Define styles as JavaScript objects
  const styles = {
    navbar: {
<<<<<<< HEAD
      backgroundColor: 'black', // indigo-700
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    container: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '0 16px',
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    flexRow: {
      display: 'flex',
      gap: '16px',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: '1.25rem',
      textDecoration: 'none',
      color: 'white',
    },
    navLink: {
      padding: '20px 12px',
      textDecoration: 'none',
      color: 'white',
      borderRadius: '4px',
    },
    navLinkHover: {
      backgroundColor: '#4f46e5', // indigo-600
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    loginButton: {
      padding: '8px 12px',
      backgroundColor: '#4f46e5', // indigo-600
      color: 'white',
      borderRadius: '4px',
      textDecoration: 'none',
    },
    signupButton: {
      padding: '8px 12px',
      backgroundColor: '#16a34a', // green-600
      color: 'white',
      borderRadius: '4px',
      textDecoration: 'none',
    },
    mobileMenuButton: {
      display: 'flex',
      alignItems: 'center', 
      padding: '8px',
      border: 'none',
      background: 'none',
      color: 'white',
      cursor: 'pointer',
    },
    mobileMenu: {
      display: isMobileMenuOpen ? 'block' : 'none',
    },
    mobileNavLink: {
      display: 'block',
      padding: '8px 16px',
      fontSize: '0.875rem',
      textDecoration: 'none',
      color: 'white',
    },
    mobileBtnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px',
      padding: '16px',
    },
    desktopNavLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
=======
      backgroundColor: "black", // indigo-700
      color: "white",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    container: {
      maxWidth: "1152px",
      margin: "0 auto",
      padding: "0 16px",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
    },
    flexRow: {
      display: "flex",
      gap: "16px",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      padding: "20px 0",
    },
    logoText: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      textDecoration: "none",
      color: "white",
    },
    navLink: {
      padding: "20px 12px",
      // textDecoration: 'none',
      color: "white",
      borderRadius: "4px",
    },
    navLinkHover: {
      backgroundColor: "#4f46e5", // indigo-600
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    loginButton: {
      padding: "8px 12px",
      backgroundColor: "#4f46e5", // indigo-600
      color: "white",
      borderRadius: "4px",
      textDecoration: "none",
    },
    signupButton: {
      padding: "8px 12px",
      backgroundColor: "#16a34a", // green-600
      color: "white",
      borderRadius: "4px",
      textDecoration: "none",
    },
    mobileMenuButton: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      border: "none",
      background: "none",
      color: "white",
      cursor: "pointer",
    },
    mobileMenu: {
      display: isMobileMenuOpen ? "block" : "none",
    },
    mobileNavLink: {
      display: "block",
      padding: "8px 16px",
      fontSize: "0.875rem",
      textDecoration: "none",
      color: "white",
    },
    mobileBtnContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
      padding: "16px",
    },
    desktopNavLinks: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
    },
  };

  // Function to handle hover effect (you'll need to implement this with state for each link)
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
  };

  const handleMouseLeave = (e) => {
<<<<<<< HEAD
    e.target.style.backgroundColor = '';
=======
    e.target.style.backgroundColor = "";
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.flexBetween}>
          <div style={styles.flexRow}>
            {/* Logo */}
            <div style={styles.logoContainer}>
<<<<<<< HEAD
              <Link to="/" style={styles.logoText}>EventsHub</Link>
            </div>
            
            {/* Primary Nav */}
            <div style={{
              ...styles.desktopNavLinks,
              display: windowWidth >= 768 ? 'flex' : 'none'
            }}>
              <Link 
                to="/" 
=======
              <Link to="/" style={styles.logoText}>
                EventsHub
              </Link>
            </div>

            {/* Primary Nav */}
            <div
              style={{
                ...styles.desktopNavLinks,
                display: windowWidth >= 768 ? "flex" : "none",
              }}
            >
              <Link
                to="/"
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
                style={styles.navLink}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Home
              </Link>
<<<<<<< HEAD
              <Link 
                to="/events" 
=======
              <Link
                to="/events"
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
                style={styles.navLink}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Events
              </Link>
<<<<<<< HEAD
              <Link 
                to="/about" 
=======
              <Link
                to="/about"
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
                style={styles.navLink}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                About Us
              </Link>
<<<<<<< HEAD
              <Link 
                to="/contact" 
=======
              <Link
                to="/contact"
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
                style={styles.navLink}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Contact Us
              </Link>
            </div>
          </div>
<<<<<<< HEAD
          
          {/* Secondary Nav */}
          <div style={{
            ...styles.buttonContainer,
            display: windowWidth >= 768 ? 'flex' : 'none'
          }}>
            <Link 
              to="/login" 
              style={styles.loginButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginButton.backgroundColor}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              style={styles.signupButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.signupButton.backgroundColor}
=======

          {/* Secondary Nav */}
          <div
            style={{
              ...styles.buttonContainer,
              display: windowWidth >= 768 ? "flex" : "none",
            }}
          >
            <Link
              to="/login"
              style={styles.loginButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#4338ca")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  styles.loginButton.backgroundColor)
              }
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={styles.signupButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  styles.signupButton.backgroundColor)
              }
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
            >
              Sign Up
            </Link>
          </div>
<<<<<<< HEAD
          
          {/* Mobile menu button */}
          <div style={{
            display: windowWidth < 768 ? 'flex' : 'none'
          }}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={styles.mobileMenuButton}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
=======

          {/* Mobile menu button */}
          <div
            style={{
              display: windowWidth < 768 ? "flex" : "none",
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={styles.mobileMenuButton}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
              </svg>
            </button>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      
      {/* Mobile menu */}
      <div style={styles.mobileMenu}>
        <Link to="/" style={styles.mobileNavLink}>Home</Link>
        <Link to="/events" style={styles.mobileNavLink}>Events</Link>
        <Link to="/about" style={styles.mobileNavLink}>About Us</Link>
        <Link to="/contact" style={styles.mobileNavLink}>Contact Us</Link>
        <div style={styles.mobileBtnContainer}>
          <Link to="/login" style={{...styles.loginButton, fontSize: '0.875rem'}}>Login</Link>
          <Link to="/signup" style={{...styles.signupButton, fontSize: '0.875rem'}}>Sign Up</Link>
=======

      {/* Mobile menu */}
      <div style={styles.mobileMenu}>
        <Link to="/" style={styles.mobileNavLink}>
          Home
        </Link>
        <Link to="/events" style={styles.mobileNavLink}>
          Events
        </Link>
        <Link to="/about" style={styles.mobileNavLink}>
          About Us
        </Link>
        <Link to="/contact" style={styles.mobileNavLink}>
          Contact Us
        </Link>
        <div style={styles.mobileBtnContainer}>
          <Link
            to="/login"
            style={{ ...styles.loginButton, fontSize: "0.875rem" }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{ ...styles.signupButton, fontSize: "0.875rem" }}
          >
            Sign Up
          </Link>
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
