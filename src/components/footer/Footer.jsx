import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <h3>Copyright © 2022, Fady Magdy </h3>
        <p>All Rights Reserved</p>
      </div>
      <div className="right">
        <a href="https://www.linkedin.com/in/fady-magdy-dev/">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="https://github.com/Fady-Magdy">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.facebook.com/fady.magdy.dev">
          <i className="fa-brands fa-square-facebook"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
