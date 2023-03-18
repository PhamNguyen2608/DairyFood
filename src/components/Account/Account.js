import React, { useEffect, useState } from "react";
import "./../Foods/Foods.css";
import firebase from "../firebase-config";
import { Link } from "react-router-dom";
import "./Account.css";
const Account = (props) => {
  const [email, setemail] = useState();
  const [name, setname] = useState();
  const [image, setimage] = useState("");
  const [uid, setuid] = useState("");
  const [deliverydetails, setdeliverydetails] = useState("");

  useEffect(() => {
    const user = () => {
      const user = firebase.auth().currentUser;

      if (user) {
        setimage(user.photoURL);
        setname(user.displayName);
        setemail(user.email);
        setuid(user.uid);
      }
    };
    user();
  }, []);

  console.log("UID: " + uid);
  return (
    <>
      <h1 className="profile-heading">Thông tin của bạn</h1>
      <div class="row py-5 px-4">
        <div class="col-xl-4 col-md-6 col-sm-10 mx-auto">
          <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 bg-dark">
              <div class="media align-items-end profile-header">
                <div class="profile mr-3">
                  <img
                    src={image}
                    alt="..."
                    width="130"
                    class="rounded mb-2 img-thumbnail"
                  />

                  <Link to="/pastorder">
                    <a href="#" class="btn btn-dark btn-sm btn-block">
                      Món ăn đã nấu
                    </a>
                  </Link>
                </div>
                <div class="media-body mb-5 text-white">
                  <h4 class="mt-0 mb-0">
                    {name}{" "}
                    {uid === process.env.REACT_APP_BASE_URL ? (
                      "(admin)"
                    ) : (
                      <div />
                    )}
                  </h4>
                  <p class="small mb-4">
                    {" "}
                    <i class="fa fa-map-marker mr-2"></i>
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
