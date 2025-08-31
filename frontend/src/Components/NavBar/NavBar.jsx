import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./NavBar.css";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppcontext } from "../../context/AppContext";

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
  // const { isSignedIn, user } = useUser(); // 👈 get auth state
  // const navigate = useNavigate();

  const { user, navigate, isOwner, setShowHotelReg } = useAppcontext();
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
          {user && (
            <button
              className="dashboard-btn"
              onClick={() =>
                isOwner ? navigate("/owner") : setShowHotelReg(true)
              }
            >
              {isOwner ? `Dashboard` : `List Your Hotel`}
            </button>
          )}
        </div>

        <div className="nav-right">
          <img src={assets.searchIcon} alt="search" className="icon" />
          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-Bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          {!user && (
            <button className="login-btn" onClick={() => openSignIn()}>
              Login
            </button>
          )}
        </div>

        <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {user && (
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

        {!user && (
          <button onClick={openSignIn} className="login-btn">
            Login
          </button>
        )}
        {user && (
          <button
            className="dashboard-btn"
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
          >
            {isOwner ? `Dashboard` : `List Your Hotel`}
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
