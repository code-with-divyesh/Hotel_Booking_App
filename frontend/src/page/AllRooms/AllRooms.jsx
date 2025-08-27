import React from "react";
import "./AllRooms.css";
import Title from "../../Components/Title/Title";
import { roomsDummyData } from "../../assets/assets";
import HotelCardAllRooms from "../../Components/HotelCardAllRooms/HotelCard";
import Filters from "../../Components/Filters/Filters";

const AllRooms = () => {
  return (
    <div className="container">
      <div className="room-left">
        <Title
          align="left"
          title="Hotel Rooms"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />

        {/* Filters mobile ke liye - hotel cards ke upar */}
        <div className="filters-mobile">
          <Filters />
        </div>

        <div className="ar-list">
          {roomsDummyData.map((room, idx) => (
            <HotelCardAllRooms
              key={room._id || idx}
              room={room}
              index={idx}
              showLocation
            />
          ))}
        </div>
      </div>

      {/* Filters desktop ke liye - right sidebar */}
      <div className="room-right">
        <div className="filters-desktop">
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
