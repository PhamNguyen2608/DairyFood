import {
  faUtensils,
  faCheckCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import allFoods from "../../fakeData/index";
import suggestionFood from "../../fakeData/suggestionFood";
import RecommendFood from "../RecommendFood/RecommendFood";
import "./FoodDetails.css";
import axios from "axios";
import Rating from "../Ratting/Ratting";
import Start from "../Ratting/StarRating";
const FoodDetails = (props) => {
 const { id } = useParams();

  const [FoodDetail, setFoodDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  let history = useHistory();

  // useEffect(() => {
  //   setIsLoading(true); // bắt đầu lấy dữ liệu, isLoading được set thành true
  //   fetch(`https://641474f736020cecfda920f8.mockapi.io/api/v1/food/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAllFoods(data);
  //       setIsLoading(false); // lấy xong dữ liệu, isLoading được set thành false
  //     })
  //     .catch((error) => console.log(error));
  // }, [id]);
  useEffect(() => {
    axios
      .get(`https://641474f736020cecfda920f8.mockapi.io/api/v1/food/${id}`)
      .then((response) => {
        setFoodDetail(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  // console.log("allFoods",  allFoods);
  // const allFoodsAr = Object.values(allFoods);

  // const currentFood = allFoodsAr.find((food) =>  food.id === id); // chỉ gọi hàm find khi isLoading là false và allFoods đã được cập nhật
// console.log("id",id)
//   console.log("currentFood", currentFood);

 
  useEffect(() => {
    if (FoodDetail?.quantity) {
      setQuantity(FoodDetail?.quantity);
    }
  }, [FoodDetail?.quantity]);

  const finalCartHandler = (FoodDetail) => {
    FoodDetail.quantity = quantity;

    props.cartHandler(FoodDetail);
    setIsSuccess(true);
  };

  if (isSuccess) {
    setTimeout(() => setIsSuccess(false), 1500);
  }

  const [suggestFoods, setSuggestFoods] = useState([]);

  useEffect(() => {
    const suggestFood = suggestionFood.slice(0, 3);
    setSuggestFoods(suggestFood);
  }, []);

  let m = 0;
  let n = 3;
  const newSuggestionFood = () => {
    const newSuggestFood = suggestionFood.slice(m + 3, n + 3);
    suggestionFood.splice(m, 3);
    setSuggestFoods(newSuggestFood);
  };

  function goBack() {
    history.push("/");
    window.scrollTo(0, 9999);
  }

  return (
    <div className="food-details container scrollable">
      <div className="text-center">
        <div onClick={goBack}>
          <button
            className="btn btn-danger btn-rounded my-3"
            onClick={newSuggestionFood}
          >
            <FontAwesomeIcon icon={faWindowClose} />
            <span> Close </span>
          </button>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-7 pr-md-4">
          <h1>{FoodDetail?.name}</h1>
          <p className="my-5">{FoodDetail?.story}</p>
          <div className="d-flex my-4"></div>

          <div className="action d-flex align-items-center">
            <button
              className="btn btn-danger btn-rounded mb-2"
              onClick={() => finalCartHandler(FoodDetail)}
            >
              <FontAwesomeIcon icon={faUtensils} />
              <span> Nấu ngay</span>
            </button>
            {isSuccess && (
              <p className="ml-3 success-mgs text-success">
                <FontAwesomeIcon icon={faCheckCircle} /> Món đã được thêm vào
                bếp
              </p>
            )}
          </div>
          <div className="my-4">
            <Start/>
            <Rating/>
            {suggestFoods.map((recommendFood) => (
              <RecommendFood
                recommendFoods={recommendFood}
                key={recommendFood?.id}
                currentFood={FoodDetail}
              ></RecommendFood>
            ))}
          </div>
        </div>

        <div className="col-md-5 order-first order-md-last">
          <img
            className="img-fluid mb-4"
            src={FoodDetail?.img}
            alt="food-image"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
