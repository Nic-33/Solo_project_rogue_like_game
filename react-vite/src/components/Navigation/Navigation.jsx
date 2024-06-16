import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from '../../Images/logo.png'
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let comingSoon = () => alert("Feature coming soon")

  const loggedInLinks = (
    <>
      <NavLink className="nav-links" exact to="/">Home</NavLink>
      <NavLink className="nav-links" onClick={comingSoon}>
        Learn More
      </NavLink>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink className="nav-links" onClick={comingSoon}>
        Get Started
      </NavLink>
      <NavLink className="nav-links" onClick={comingSoon}>
        Learn More
      </NavLink>
    </>
  );

  return (
    <nav className="header">
      <div className="nav-bar">
        <div className="nav-links-ctn">
          <NavLink exact to="/" className="nav-home">
            <img id='logo' src={logo} alt='home' />
          </NavLink>
          {sessionUser ? loggedInLinks : loggedOutLinks}
        </div>
        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
