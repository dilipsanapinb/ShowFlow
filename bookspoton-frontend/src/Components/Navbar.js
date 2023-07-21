import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { UserContext } from "./Userinfo/UserContext";

const Navbar = () => {
     const { loggedInUser } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
  //  console.log(loggedInUser);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    //   if (loggedInUser) {
    //     setIsDropdownOpen(true);
    //   } else {
    //     setIsDropdownOpen(!isDropdownOpen);
    //   }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          BookspotOn
        </Link>
      </div>
      <div className="navbar-middle">
        <div className="search-input">
          <BiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="navigation">
          <Link to="/movies" className="nav-button">
            Movies
          </Link>

          <Link to="/shows" className="nav-button">
            Shows
          </Link>

          <Link to="/events" className="nav-button">
            Events
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <div
          className={`hamburger ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
            {loggedInUser ? (
              <p className="user-name">{loggedInUser}</p>
            ) : (
              <Link to="/signin" className="dropdown-button">
                Sign In
              </Link>
            )}
            <button className="dropdown-button">Logout</button>
            <button className="dropdown-button">More</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
