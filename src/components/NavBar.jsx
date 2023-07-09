import React from 'react';
import { Link } from "react-router-dom";

export const NavBar = () => {

  return (
    <div className="navbar">
      <div className="all-links">
        <Link to='/current' className="link" >Current</Link>
        <Link to='/forecast' className="link" >Forecast</Link>
        <Link to='/history' className="link" >History</Link>
      </div>
    </div>
  );
}

export default NavBar;

