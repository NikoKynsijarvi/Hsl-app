import React from "react";
import "./../index.css";
import { FaLeaf, FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

function Navbar({ navOpen, setNavOpen }) {
  return (
    <nav className="nav">
      <div className="mobileicon">
        <FaLeaf className="logoicon" />
      </div>
      {navOpen ? (
        <FaArrowCircleUp
          onClick={() => setNavOpen(!navOpen)}
          className="circleicon"
        />
      ) : (
        <FaArrowCircleDown
          onClick={() => setNavOpen(!navOpen)}
          className="circleicon"
        />
      )}
    </nav>
  );
}

export default Navbar;
