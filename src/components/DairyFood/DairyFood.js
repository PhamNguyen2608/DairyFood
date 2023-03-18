import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import DairyFoodItem from "./DairyFoodItem";
import "./DairyFood.css";
import firebase from "../firebase-config";
import { useAuth } from "../SignUp/useAuth";

const DairyFood = (props) => {
  const [type, setType] = useState("pastOrder");
  const userauth = useAuth();
  const [foods, setFoods] = useState([]);
  const [userid, setuserid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setuserid(user.uid);
      }
    };
    user();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://641474f736020cecfda920f8.mockapi.io/api/v1/dairyFood"
        );
        const data = await response.json();
        setFoods(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
    setFoods(foods);
  }, [userid]);

  useEffect(() => {
    if (!userauth) {
      history.push("/login"); // chuyển hướng về trang đăng nhập
    }
  }, [userauth]);

  const selectedFastFoods = foods;
  return (
    <section className="food-area my-5">
      <div className="container">
        <h1 className="my-order-heading">Món ăn đã nấu</h1>
        <div className="container">
          <div className="row my-5">
            {selectedFastFoods.map((food) => (
              <DairyFoodItem food={food} key={food.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DairyFood;
