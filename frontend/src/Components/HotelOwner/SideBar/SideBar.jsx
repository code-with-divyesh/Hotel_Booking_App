import React from "react";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const sideBarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      name: "List Room",
      path: "/owner/list-room",
      icon: assets.listIcon,
    },
  ];

  return (
    <div className="sidebar">
      {sideBarLinks.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          end={item.path === "/owner"} // only dashboard exact match
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <img src={item.icon} alt={item.name} />
          <p className="link-text">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
