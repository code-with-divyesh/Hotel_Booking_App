import React from "react";
import "./HotelCard.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const HotelCard = ({ room, index, showLocation }) => {
  console.log("Address:", room.hotel.address);
  console.log("Location Icon Used:", assets.locationIcon);

  return (
    <div>
      <Link
        className="destination-card"
        to={`/rooms/${room._id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img src={room.images[0]} alt={`${room.hotel.name} image`} />

        {index % 2 === 0 && <p className="tag">Best Seller</p>}

        <div className="card-body">
          <div className="card-header">
            <p className="hotel-name">{room.hotel.name}</p>
            <div className="rating">
              <img src={assets.starIconFilled} alt="star icon" />
              4.5
            </div>
          </div>

          {showLocation && (
            <div className="hotel-location">
              <img src={assets.locationIcon} alt="location icon" />
              <span>{room.hotel.address}</span>
            </div>
          )}

          <div className="card-footer">
            <p>
              <span className="price">${room.pricePerNight}</span>/night
            </p>
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
