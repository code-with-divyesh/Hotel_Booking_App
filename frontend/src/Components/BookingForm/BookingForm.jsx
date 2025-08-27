import React from "react";
import { assets } from "../../assets/assets";
import "./BookingForm.css";
const BookingForm = () => {
  return (
    <form class="booking-detail-form">
      <div className="form-group-detail">
        <div className="label-with-icon-detail">
          <img src={assets.calenderIcon} alt="" />
          <label htmlFor="Check in">Check in</label>
        </div>
        <input type="date" id="Check in" />
      </div>
      <div className="divider" />
      <div className="form-group-detail">
        <div className="label-with-icon-detail">
          <img src={assets.calenderIcon} alt="" />
          <label htmlFor="Check in">Check Out</label>
        </div>
        <input type="date" id="Check out" />
      </div>
      <div className="divider" />
      <div className="form-group-detail guests-detail">
        <label for="guests">Guests</label>
        <input min="1" max="4" id="guests" type="number" placeholder="0" />
      </div>
      <div className="divider" />
      <button className="search-btn-detail">
        <img src={assets.searchIcon} alt="search" />
        <span>Check Availability</span>
      </button>
    </form>
  );
};

export default BookingForm;
