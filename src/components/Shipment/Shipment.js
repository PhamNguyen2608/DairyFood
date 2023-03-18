import React, { useEffect } from "react";
import "./Shipment.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "../firebase-config";

const Shipment = (props) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const { toDoor, road, flat, businessName, address } = props.deliveryDetails;
    const { orderID, deliveryDetails } = props.orderDetails;
    const [userid, setuserid] = useState();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (register) => {
      console.log(register);
      props.deliveryDetailsHandler(register);
      console.log("submitted in database");
      onOrderComplete();
    };

  const totalQuantity = props.cart.reduce((acc, crr) => {
    return acc + crr.quantity;
  }, 0);


  useEffect(() => {
    const user = () => {
      const user = firebase.auth().currentUser;
      setuserid(user.uid);
    };
    user();
  }, []);

 


  async function handleDone() {
    {
      props.cart.map(async (item) => {
        const data = {
          name: item.name,
          story: item.story,
          description: item.description,
          img: item.img,
          category: item.category,
          restaurant: item.restaurant,
        };
        console.log("item", item);
        const response = await fetch(
          "https://641474f736020cecfda920f8.mockapi.io/api/v1/dairyFood",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          console.log("Data sent successfully");
        } else {
          console.log("Data sending failed");
        }
      });
    }

   
     // clear the cart
     props.clearCart();
  }
  async function onOrderComplete() {
    const totalOrdersRef = await firebase.firestore().collection("orders");
    const adminDataRef = await firebase
      .firestore()
      .collection("admin")
      .doc("PXToN4KwoyUcMZFpFyCRBOQhvXj1");

    adminDataRef.update({
      orderCount: firebase.firestore.FieldValue.increment(1),
      productSalesCount: firebase.firestore.FieldValue.increment(totalQuantity),
    });

    const addressRef = await firebase
      .firestore()
      .collection("users")
      .doc(userid);
    const ordersRef = await firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .collection("orders");

    addressRef.update({
      address: props.deliveryDetails,
      orderCount: firebase.firestore.FieldValue.increment(1),
    });

    await totalOrdersRef.add({
      products: props.cart,
      address: props.deliveryDetails,
    });

    await ordersRef
      .add({
        products: props.cart,
        address: props.deliveryDetails,
      })
      .then(function (docRef) {
        props.setorderDetailsHandler({
          deliveryDetails: props.deliveryDetails,
          orderID: docRef.id,
        });

        console.log("Tutorial created with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding Tutorial: ", error);
      });
  }

  return (
    <div className="shipment container my-5">
      <div className="row">
        <div className=" col-md-5">
          <div className="restaurant-info mb-3">
            <h4>
              <h5 className="text-cook"> Bạn đang nấu món </h5>
            </h4>
          </div>

          {props.cart.map((item) => (
            <div className="parent">
              <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
                <img
                  width="140px"
                  className="moor-images"
                  src={item.img}
                  alt="food-image"
                />
                <div className="px-4">
                  <h6>{item.name}</h6>
                </div>

                <div className="checkout-item-button ml-3 btn">
                  {item.quantity > 0 ? (
                    <button
                      onClick={() =>
                        props.checkOutItemHandler(item.id, item.quantity - 1)
                      }
                      className="btn font-weight-bolder"
                    >
                      Hủy
                    </button>
                  ) : (
                    <button className="btn font-weight-bolder">-</button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {!props.cart.length && (
            <h3 className="py-3">
              Bạn đang rảnh rỗi<a href="/"> Chọn món ngay</a>
            </h3>
          )}

          <div className="cart-calculation">
            <p className="d-flex justify-content-between"></p>
            <p className="h5 d-flex justify-content-between"></p>

            {totalQuantity ? (
             
              //   to={{
              //     pathname: "/payment",
              //     state: orderID,
              //   }}
              // >
                <button
                  onClick={handleDone}
                  className="btn btn-block btn-danger"
                >
                  Nấu xong
                </button>
             
            ) : (
              <button disabled className="btn btn-block btn-secondary">
                Bạn chưa nấu món nào
              </button>
            )}
          </div>
        </div>
        <div className=" col-md-7 d-flex align-items-start">
          {props.cart.map((item) => (
            <div className="parent">
              <h1 className="text-cook">Cách nấu { item.name}</h1>
              <div class="textbox">{item.story}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipment;
