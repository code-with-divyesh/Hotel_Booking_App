import React from "react";
import "./HotelCardAllRooms.css";
import { Link } from "react-router-dom";
import { assets, facilityIcons } from "../../assets/assets";
import StarRating from "../StarRating/StarRating";

const HotelCardAllRooms = ({ room, index, showLocation }) => {
  return (
    <div className="hotel-card">
      <Link
        className="des-card"
        to={`/rooms/${room._id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        {/* LEFT IMAGE */}
        <div className="hc-img-wrap">
          <img src={room.images[0]} alt={`${room.hotel.name} image`} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="card-content">
          <p className="hotel-city">{room.hotel.city}</p>
          <p className="hotel-title">{room.hotel.name}</p>

          <div className="hc-rating">
            <StarRating color="#ff7d01" />
            <span className="reviews">200+ reviews</span>
          </div>

          {showLocation && (
            <div className="hotel-location">
              <img src={assets.locationIcon} alt="location" />
              <span>{room.hotel.address}</span>
            </div>
          )}

          <div className="amenities">
            {room.amenities.map((item, i) => (
              <div key={i} className="amenity-pill">
                <img src={facilityIcons[item]} alt={item} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="price">
            ${room.pricePerNight} <span>/night</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardAllRooms;
