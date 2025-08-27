import React from "react";
import Title from "../Title/Title";
import HotelCard from "../HotelCard/HotelCard";
import { roomsDummyData } from "../../assets/assets";
import "./FeaturedDestination.css";
import { useNavigate } from "react-router-dom";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <div className="featured-destination-section">
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="destination-cards">
        {roomsDummyData.map((room, index) => (
          <HotelCard
            key={room._id}
            room={room}
            index={index}
            showLocation={true}
          />
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/rooms");
          window.scrollTo(0, 0);
        }}
        className="view-all-btn"
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;
