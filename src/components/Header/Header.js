import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo2.png";
import userPhoto from "../../images/ICON/Group 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faHamburger,
  faDumpsterFire,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../SignUp/useAuth";

const Header = (props) => {
  const auth = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-light bg-white py-2  sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Urban Eatery logo" />
        </Link>

        <ul className="navbar-nav align-items-center">

          <li className="nav-item active">
            <Link to="/pastorder" className="nav-link">
              <FontAwesomeIcon icon={faHamburger} />
              <span className="badge bg-light">Món ăn đã nấu</span>
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/checkout" className="nav-link">
              <FontAwesomeIcon icon={faDumpsterFire} />
              <span className="badge bg-light">
                Bếp&nbsp;{props.cart.length}
              </span>
            </Link>
          </li>

          <li className="nav-item">
            {auth.user ? (
              <Link to="/account" className="nav-link">
                {auth.user.displayName}
                <img
                  className="ml-3 circle"
                  src={auth.user.photoURL ? auth.user.photoURL : userPhoto}
                  width="35px"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/signup" className="nav-link">
               
              </Link>
            )}
          </li>

          <li className="nav-item">
            {auth.user ? (
              <Link to="/" className="nav-link">
                <button
                  onClick={() => {
                    auth.signOut();
                  }}
                  className="btn btn-danger btn-rounded"
                >
                 Đăng xuất
                </button>
              </Link>
            ) : (
              <Link to="/signup" className="nav-link">
                <button className="btn btn-danger btn-rounded">Đăng nhập</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
