import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./NavBar.css";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 19V4a1 1 0 011-1h12a1 1 0 011 1v13H7a2 2 0 00-2 2zm0 0a2 2 0 002 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const NavBar = ({ onListYourHotelClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk(); // 👈 corrected: openSignIn instead of openSignin
  const { isSignedIn, user } = useUser(); // 👈 get auth state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${
        isScrolled || location.pathname !== "/" ? "scrolled" : ""
      }`}
    >
      <div className="navbar-inner">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="logo" />
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/rooms">Hotels</Link>
          <Link to="/">Experience</Link>
          <Link to="/">About</Link>
          {!isSignedIn && <button className="dashboard-btn">Dashboard</button>}
          {isSignedIn && (
            <button
              className="dashboard-btn"
              onClick={() => {
                if (onListYourHotelClick) onListYourHotelClick();
              }}
            >
              List Your Hotel
            </button>
          )}
        </div>

        <div className="nav-right">
          <img src={assets.searchIcon} alt="search" className="icon" />
          {isSignedIn && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => {
                    "/my-Bookings";
                  }}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          {!isSignedIn && (
            <button className="login-btn" onClick={() => openSignIn()}>
              Login
            </button>
          )}
        </div>

        <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isSignedIn && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => {
                    navigate("/myBookings");
                  }}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <img src={assets.menuIcon} alt="menu" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <button onClick={() => setIsMenuOpen(false)} className="close-btn">
          <img src={assets.closeIcon} alt="close" />
        </button>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>
          Hotels
        </Link>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Experience
        </Link>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
        {isSignedIn && (
          <button
            className="dashboard-btn"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/owner");
            }}
          >
            Dashboard
          </button>
        )}

        {!isSignedIn && (
          <button onClick={openSignIn} className="login-btn">
            Login
          </button>
        )}
        {isSignedIn && (
          <button
            className="dashboard-btn"
            onClick={() => {
              if (onListYourHotelClick) onListYourHotelClick();
            }}
          >
            List Your Hotel
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
