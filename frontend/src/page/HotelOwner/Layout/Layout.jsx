import React from "react";
import NavBar from "../../../Components/HotelOwner/NavBar/NavBar";
import SideBar from "../../../Components/HotelOwner/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <div className="owner-container">
      <NavBar />
      <div className="owner-hero-section">
        <SideBar />
        <div className="owner-main-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
