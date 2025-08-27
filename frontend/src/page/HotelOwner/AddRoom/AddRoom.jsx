import React, { useState } from "react";
import Title from "../../../Components/Title/Title";

import { assets } from "../../../assets/assets";
import "./AddRoom.css";
const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free BreakFast": false,
      "Room  Services": false,
      "Mountain view": false,
      "Pool Access": false,
    },
  });
  return (
    <form>
      <Title
        align="left"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
        title="Add Room
"
      />
      <p className="images-text">images</p>
      <div className="images-container">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="uploadImage"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              alt="image"
              onChange={(e) => {
                setImages({ ...images, [key]: e.target.files[0] });
              }}
            />
          </label>
        ))}
      </div>
      <div className="room-price-container">
        <div className="room">
          <p className="room-text">Room Type</p>
          <select
            className="room-selction"
            value={input.roomType}
            onChange={(e) => setInput({ ...input, roomType: e.target.value })}
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div className="price-container">
          <p className="price-text">
            Price <span className="text-xs">/Night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="price-input"
            value={input.pricePerNight}
            onChange={(e) =>
              setInput({ ...input, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>
      <p className="Amenities-text">Amenities</p>
      <div className="Amennities-container">
        {Object.keys(input.amenities).map((aminity, index) => (
          <div className="aminity" key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={input.amenities[aminity]}
              onChange={(e) => {
                setInput({
                  ...input,
                  amenities: {
                    ...input.amenities,
                    [aminity]: !input.amenities[aminity],
                  },
                });
              }}
            />
            <label htmlFor={`amenities${index + 1}`}>{aminity}</label>
          </div>
        ))}
      </div>
      <button className="Addroom-btn">Add Room</button>
    </form>
  );
};

export default AddRoom;
