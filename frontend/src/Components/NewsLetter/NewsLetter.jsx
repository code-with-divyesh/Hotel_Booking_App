import React from "react";
import { assets } from "../../assets/assets";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-header">
        <h1>Stay Inspired</h1>
        <p className="newsletter-des">
          Join our newsletter and be the first to discover new destinations,
          exclusive offers, and travel inspiration.
        </p>
      </div>
      <div className="newsletter-form">
        <input type="text" placeholder="Enter your email" />
        <button className="sub-btn">
          Subscribe
          <img className="arrow-icon" src={assets.arrowIcon} alt="" />
        </button>
      </div>
      <p className="newsletter-footer">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
};

export default NewsLetter;
