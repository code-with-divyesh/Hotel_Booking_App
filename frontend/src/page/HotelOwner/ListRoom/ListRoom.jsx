import React, { useState } from "react";
import Title from "../../../Components/Title/Title";
import { dashboardDummyData, roomsDummyData } from "../../../assets/assets";
import "./ListRoom.css";
const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);
  const toggleAvailability = (index) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[index].isAvailable = !updatedRooms[index].isAvailable;
      return updatedRooms;
    });
  };

  return (
    <div>
      <Title
        align="left"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="hotel-text">All Rooms</p>
      <table className="hotel-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Facility</th>
            <th>Price / night</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((item, index) => (
            <tr key={index}>
              <td>{item.roomType}</td>
              <td>{item.amenities.join(", ")}</td>
              <td>${item.pricePerNight}</td>
              <td className="actions-cell">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item.isAvailable}
                    onChange={() => toggleAvailability(index)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRoom;
