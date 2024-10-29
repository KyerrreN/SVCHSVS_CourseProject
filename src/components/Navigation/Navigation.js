import React, { Component } from "react";
import "../Navigation/Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ navClass }) {
  return (
    <nav className={navClass}>
      <Link to="/">Main</Link>
      <Link to="/partners">Vendors</Link>
      <Link to="/news">News</Link>
      <Link to="/freelancers">Freelancers</Link>
    </nav>
  );
}

export default Navigation;
