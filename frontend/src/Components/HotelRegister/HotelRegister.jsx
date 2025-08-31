import React from "react";
import { assets } from "../../assets/assets";
import "./HotelRegister.css";
import { useAppcontext } from "../../context/AppContext";
const HotelRegister = () => {
  const { setShowHotelReg } = useAppcontext();
  return (
    <div className="model-overlay">
      <div className="model-form">
        <img src={assets.regImage} alt="regImage" className="form-image" />
        <div className="form-content">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="close-icon"
            onClick={() => setShowHotelReg(false)}
          />
          <p className="form-title">Register Your Hotel</p>
          <div class="form-group">
            <label for="name">Hotel Name</label>
            <input placeholder="Type here" required type="text" />
          </div>
          <div class="form-group">
            <label for="contact">Phone</label>
            <input id="contact" placeholder="Type here" required type="text" />
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea
              id="address"
              rows="2"
              placeholder="Type here"
              required
            ></textarea>
          </div>
          <div class="form-group small">
            <label for="city">City</label>
            <select id="city" required>
              <option value="">Select City</option>
              <option value="Dubai">Dubai</option>
              <option value="Singapore">Singapore</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
            </select>
          </div>
          <button class="submit-btn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default HotelRegister;
