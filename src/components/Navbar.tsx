import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState("John Doe");
  const [showGreeting, setShowGreeting] = useState(false);

  const handleGreetingButtonClick = () => {
    setShowGreeting(true);
  };

  const handleCloseGreeting = () => {
    setShowGreeting(false);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"}>
          <span className="heading">Book the Show</span>
        </Link>
      </div>
      <div className="right">
        <div className="tab" onClick={handleGreetingButtonClick}>
          Profile
        </div>
        <div
          className="greeting-popup"
          style={{ display: showGreeting ? "block" : "none" }}
        >
          <p className="hello">Hello, {currentUser}!</p>
          <button onClick={handleCloseGreeting}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
