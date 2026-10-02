import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShopContext } from "../context/ShopContextProvider";

import { assets } from "../assets/assets";

const Navbar = () => {

  const navigate = useNavigate();

  const { getCartCount } = useContext(ShopContext);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        <img
          src={assets.logo}
          alt="FOREVER"
        />
      </Link>


      {/* NAV LINKS */}
      <div className="nav-links">

        <Link to="/">
          HOME
        </Link>

        <Link to="/collection">
          COLLECTION
        </Link>

        <Link to="/about">
          ABOUT
        </Link>

        <Link to="/contact">
          CONTACT
        </Link>

      </div>


      {/* NAV ICONS */}
      <div className="nav-icons">

        {/* SEARCH */}
        <img
          src={assets.search_icon}
          alt="Search"
          onClick={() =>
            navigate("/collection")
          }
        />


        {/* PROFILE */}
        <img
          src={assets.profile_icon}
          alt="Profile"
          onClick={() =>
            navigate("/login")
          }
        />


        {/* CART */}
        <div
          className="cart-icon"
          onClick={() =>
            navigate("/cart")
          }
        >

          <img
            src={assets.cart_icon}
            alt="Cart"
          />

          {getCartCount() > 0 && (
            <span>
              {getCartCount()}
            </span>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;