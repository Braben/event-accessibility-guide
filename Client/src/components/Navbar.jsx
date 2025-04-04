import React, { useState, useEffect } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LogoutButton from './LogoutBtn';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const locations = useLocation();
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("FIREBASE USER:", currentUser);
      if (currentUser) {
        // Fetch additional user details from your database
        const userProfile = await getUserProfile(currentUser.uid);
        setUser({ ...currentUser, ...userProfile });
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
   
  const isActive = (path) => locations.pathname === path;

  // Define styles as JavaScript objects
  const styles = {
    navbar: {
      background: 'linear-gradient(to top, #F8F9FB, #FDFDFD)', 
      color: "black",
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '1rem',
    },
    container: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '0 16px',
    },
    activeNavLink: {
      color: '#1E4B9D',
    },
    flexBetween: {
      display: 'flex',
      justifyContent:'center',
      gap:'100px',
    },
    flexRow: {
      display: 'flex',
      gap: '15px',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: '1.35rem',
      textDecoration: 'none',
      color: 'black',
    },
   
    navLink: {
      padding: '30px 12px ',
      textDecoration: 'none',
      color: 'black',
      borderRadius: '4px',
      
    },
    navLinkHover: { 
      backgroundColor: '#4f46e5', 
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    loginButton: {
      padding: '8px 12px',
      backgroundColor: 'linear-gradient(to top, #F8F9FB, #FDFDFD)', 
      color: 'black',
      borderRadius: '4px',
      textDecoration: 'none',
    },
    signupButton: {
      padding: '8px 12px',
      backgroundColor: '#1E4B9D',
      color: 'white',
      borderRadius: '20px',
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
      margin:'0 120px 0 240px ',
    },
  };

  // Function to handle hover effect (you'll need to implement this with state for each link)
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.flexBetween}>
          <div style={styles.flexRow}>
            {/* Logo */}
            <div style={styles.logoContainer}>
              <Link to="/" style={styles.logoText}>VenueHubs</Link>
            </div>
            
            {/* Primary Nav */}
            <div style={{
            ...styles.desktopNavLinks,
            display: windowWidth >= 768 ? 'flex' : 'none'
          }}>
            {['/', '/Venues', '/About', '/FAQs', '/contact'].map((path) => (
              <Link 
                key={path}
                to={path}
                style={{
                  ...styles.navLink,
                  ...(isActive(path) && styles.activeNavLink)
                }}
              >
                {path.replace('/', '') || 'Home'}
              </Link>
            ))}
          </div>
          </div>
          
          {/* Secondary Nav */}
          <div style={{
            ...styles.buttonContainer,
            display: windowWidth >= 768 ? 'flex' : 'none'
          }}>
            {user? (
              <LogoutButton /> ) : (
                <>
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
                  >
                    Sign Up
                  </Link>
                </>
              )
            }
          </div>
          
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
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div style={styles.mobileMenu}>
        <Link to="/" style={styles.mobileNavLink}>Home</Link>
        <Link to="/events" style={styles.mobileNavLink}>Events</Link>
        <Link to="/about" style={styles.mobileNavLink}>About Us</Link>
        <Link to="/contact" style={styles.mobileNavLink}>Contact Us</Link>
        <div style={styles.mobileBtnContainer}>
          <Link to="/login" style={{...styles.loginButton, fontSize: '0.875rem'}}>Login</Link>
          <Link to="/signup" style={{...styles.signupButton, fontSize: '0.875rem'}}>Sign Up</Link>
        </div>
      </div>
      <div className='h-[1px] w-full bg-gray-300'></div>
    </nav>
  );
};

export default Navbar;
