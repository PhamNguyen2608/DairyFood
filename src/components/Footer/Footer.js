import React from "react";
import "./Footer.css";
import whiteLogo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../SignUp/useAuth";
const Footer = () => {
  const auth = useAuth();
  const uid = auth.user == undefined ? "sddfd" : auth.user.uid;
  return (
    <footer className="bg-color py-3">
      <div className="container">
        <div className="row footer-top py-5">
          <div className="col-md-6 mb-5">
            <img src={whiteLogo} alt="white-logo" />
          </div>
          <div className="col-md-6">
            <h1 className="text-wellcome">Chào mừng bạn!!!</h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
