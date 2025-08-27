import React, { useState } from "react";
import Title from "../../../Components/Title/Title";
import "./Dashboard.css";
import { assets, dashboardDummyData } from "../../../assets/assets";
const Dashboard = () => {
  const [dashboardData, setdashboardData] = useState(dashboardDummyData);
  return (
    <div>
      <Title
        align="left"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
        title="Dashboard"
      />
      <div class="stats-container">
        <div class="stats-card">
          <img
            class="stats-icon"
            alt="totalBookingIcon"
            src={assets.totalBookingIcon}
          />
          <div class="stats-text">
            <p class="stats-label">Total Bookings</p>
            <p class="stats-value">{dashboardData.totalBookings}</p>
          </div>
        </div>

        <div class="stats-card">
          <img
            class="stats-icon"
            alt="totalRevenueIcon"
            src={assets.totalRevenueIcon}
          />
          <div class="stats-text">
            <p class="stats-label">Total Revenue</p>
            <p class="stats-value">$ {dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>
      <h2 class="recent-bookings-title">Recent Bookings</h2>
      <div class="recent-bookings-table">
        <table>
          <thead>
            <tr>
              <th class="user-name">User Name</th>
              <th class="room-name">Room Name</th>
              <th class="total-amount">Total Amount</th>
              <th class="payment-status">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="username" data-label="User Name">
                  {item.user.username}
                </td>
                <td className="room-name" data-label="Room Name">
                  {item.room.roomType}
                </td>
                <td className="total-amount" data-label="Total Amount">
                  ${item.totalPrice}
                </td>
                <td
                  className={`payment-status ${item.status.toLowerCase()}`}
                  data-label="Payment Status"
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
