import React, { useState } from "react";
import "./MyBookings.css";
import Title from "../../Components/Title/Title";
import { assets, userBookingsDummyData } from "../../assets/assets";

const MyBookings = () => {
  const [bookings, SetBookings] = useState(userBookingsDummyData);

  return (
    <div className="myBooking-container">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      <div className="header-row">
        <div>Hotels</div>
        <div>Date &amp; Timings</div>
        <div>Payment</div>
      </div>

      {bookings.map((booking) => (
        <div key={booking._id} className="booking-row">
          {/* Column 1: Hotels */}
          <div className="hotel-info">
            <img
              src={booking.room.images[0]}
              alt={booking.room.name}
              className="hotel-img"
            />
            <div className="hotel-text">
              <p className="hotel-name">
                {booking.hotel.name}
                <span className="room-type"> ({booking.room.roomType})</span>
              </p>
              <div className="hotel-location">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{booking.hotel.address}</span>
              </div>
              <div className="guests">
                <img src={assets.guestsIcon} alt="guests-icon" />
                <span>Guests:{booking.guests}</span>
              </div>
              <div className="total-price">Total: ${booking.totalPrice}</div>
            </div>
          </div>

          {/* Column 2: Date & Timings */}
          <div className="date-info">
            <div>
              <p className="date-label">Check-In:</p>
              <p className="date">
                {new Date(booking.checkInDate).toDateString()}
              </p>
            </div>
            <div>
              <p className="date-label">Check-out:</p>
              <p className="date">
                {new Date(booking.checkOutDate).toDateString()}
              </p>
            </div>
          </div>

          {/* Column 3: Payment */}
          <div className="payment-status">
            {booking.isPaid ? (
              <div className="status-indicator">
                <div className="status-dot paid"></div>
                <p className="status-text paid">Paid</p>
              </div>
            ) : (
              <>
                <div className="status-indicator">
                  <div className="status-dot unpaid"></div>
                  <p className="status-text unpaid">Unpaid</p>
                </div>
                <button className="pay-now-btn">Pay now</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
