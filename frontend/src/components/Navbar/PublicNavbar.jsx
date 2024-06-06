import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/create-post">CREATE</Link>
          </li>
          <li>
            <Link to="/lists">LIST</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PublicNavbar;
