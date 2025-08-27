import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import "./NavBar.css";
import { UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="nav-logo" />
        </Link>

        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;
