import React, { useEffect, useState } from "react";
import "./RoomDetails.css";
import { useParams } from "react-router-dom";
import { assets, roomsDummyData, facilityIcons } from "../../assets/assets";
import StarRating from "../../Components/StarRating/StarRating";
import BookingForm from "../../Components/BookingForm/BookingForm";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, SetRoom] = useState(null);
  const [mainImage, SetmainImage] = useState(null);
  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && SetRoom(room);
    room && SetmainImage(room.images[0]);
  }, []);
  return (
    room && (
      <div className="room-maincontainer">
        <div className="room-heading-top">
          <h1>{room.hotel.name}</h1>
          <span>({room.roomType})</span>
          <p className="heading-tag">20% OFF</p>
        </div>
        <div className="room-heading-middle">
          <StarRating />
          <p>200 +reviews</p>
        </div>
        <div className="room-heading-bottom">
          <img src={assets.locationIcon} alt="" />
          <span>Main Road 123 Street , 23 Colony</span>
        </div>
        <div className="image-container">
          <div className="main-image-wrapper">
            <img src={mainImage} className="main-image" alt="room-image" />
          </div>
          <div className="thumbnail-grid">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  src={image}
                  alt="room-image"
                  onClick={() => {
                    SetmainImage(image);
                  }}
                  key={index}
                  className={`thumbnil ${
                    mainImage == image ? "activate-thumbnil" : ""
                  }`}
                />
              ))}
          </div>
        </div>
        <div className="room-info-container">
          <div className="room-info-left">
            <h1>Experience Luxury Like Never Before</h1>
            <div className="room-feature">
              {room?.amenities?.map((item, i) => (
                <div key={i} className="amenity-pill">
                  <img src={facilityIcons[item]} alt={item} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="room-price">{room.pricePerNight}/night</p>
        </div>
        <div className="availability-form">
          <BookingForm />
        </div>
        <div className="room-specific-detail">
          <div className="room-detail">
            <img src={assets.homeIcon} alt="homeIcon" />
            <div>
              <p className="detail-heading">Clean &amp; Safe Stay</p>
              <p className="detail-des">
                A well-maintained and hygienic space just for you.
              </p>
            </div>
          </div>
          <div className="room-detail">
            <img src={assets.badgeIcon} alt="badgeIcon" />
            <div>
              <p className="detail-heading">Enhanced Cleaning</p>
              <p className="detail-des">
                This host follows Staybnb's strict cleaning standards.
              </p>
            </div>
          </div>
          <div className="room-detail">
            <img src={assets.locationFilledIcon} alt="locationIcon" />
            <div>
              <p className="detail-heading">Excellent Location</p>
              <p className="detail-des">
                90% of guests rated the location 5 stars.
              </p>
            </div>
          </div>
          <div className="room-detail">
            <img src={assets.heartIcon} alt="homeIcon" />
            <div>
              <p className="detail-heading">Smooth Check-In</p>
              <p className="detail-des">
                100% of guests gave check-in a 5-star rating.
              </p>
            </div>
          </div>
        </div>
        <div className="info-box">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>
        <div className="host-container">
          <div className="host-detail">
            <img src={assets.host} alt="host" />
            <div>
              <p className="host-name">Hosted by Urbanza Suites</p>
              <div className="review-container">
                <StarRating />
                <p className="review-text">200+ reviews</p>
              </div>
            </div>
          </div>
          <button className="contact-button">Contact Now</button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
