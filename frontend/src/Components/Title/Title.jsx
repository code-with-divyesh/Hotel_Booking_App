import React from "react";
import "./Title.css";
const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div className={`title-container ${align}`}>
      <h1 className="title-heading">{title}</h1>
      <p className="title-subtext">{subTitle}</p>
    </div>
  );
};

export default Title;
