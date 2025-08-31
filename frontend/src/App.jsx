import React, { useContext, useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home/Home";
import Footer from "./Components/Footer/Footer";
import AllRooms from "./page/AllRooms/AllRooms";
import RoomDetails from "./page/RoomDetails/RoomDetails";
import MyBookings from "./page/MyBookings/MyBookings";
import HotelRegister from "./Components/HotelRegister/HotelRegister";
import Layout from "./page/HotelOwner/Layout/Layout";
import AddRoom from "./page/HotelOwner/AddRoom/AddRoom";
import Dashboard from "./page/HotelOwner/Dashboard/Dashboard";
import ListRoom from "./page/HotelOwner/ListRoom/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppcontext } from "./context/AppContext";
const App = () => {
  const isOwnerpath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppcontext();

  return (
    <div>
      <Toaster />
      {!isOwnerpath && <NavBar />}
      {showHotelReg && <HotelRegister />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-Bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      {!isOwnerpath && <Footer />}
    </div>
  );
};

export default App;
