import React from "react";
import Title from "../Title/Title";
import { assets, exclusiveOffers } from "../../assets/assets";
import "./ExclusiveOffers.css";

const ExclusiveOffers = () => {
  return (
    <div className="offer-container">
      <div className="offer-header">
        <Title
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          align="left"
        />
        <button className="offer-btn">
          View All Offers
          <img src={assets.arrowIcon} alt="arrowIcon" />
        </button>
      </div>

      <div className="offer-grid">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="offer-card"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="offer-badge">{item.priceOff}% OFF</p>
            <div className="offer-content">
              <p className="offer-title">{item.title}</p>
              <p>{item.description}</p>
              <p className="offer-expiry">Expires on {item.expiryDate}</p>
            </div>
            <button className="offer-btn">
              View Offers
              <img src={assets.arrowIcon} alt="arrow-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
