import React from "react";
import "./Hero.css";
import { assets } from "../../assets/assets";
const Hero = () => {
  return (
    <div className="hero-section">
      <div class="custom-container">
        <p className="custom-hotel-text">The Ultimate Hotel Experience</p>
        <h1 className="hero-heading">
          Discover Your Perfect Gateway Destination
        </h1>
        <p className="hero-subtext">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>
        <form class="booking-form">
          <div className="form-group">
            <div className="label-with-icon">
              <img src={assets.locationIcon} alt="" />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input type="text" placeholder="Type City" list="destinations" />
            <datalist id="destinations">
              <option value="Dubai"></option>
              <option value="Singapore"></option>
              <option value="New York"></option>
              <option value="London"></option>
            </datalist>
          </div>
          <div className="form-group">
            <div className="label-with-icon">
              <img src={assets.calenderIcon} alt="" />
              <label htmlFor="Check in">Check in</label>
            </div>
            <input type="date" id="Check in" />
          </div>
          <div className="form-group">
            <div className="label-with-icon">
              <img src={assets.calenderIcon} alt="" />
              <label htmlFor="Check in">Check Out</label>
            </div>
            <input type="date" id="Check out" />
          </div>
          <div className="form-group guests">
            <label for="guests">Guests</label>
            <input min="1" max="4" id="guests" type="number" placeholder="0" />
          </div>
          <button className="search-btn">
            <img src={assets.searchIcon} alt="search" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
