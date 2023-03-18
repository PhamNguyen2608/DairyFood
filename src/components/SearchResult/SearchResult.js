import React from "react";
import "./SearchResult.css";
import { useParams, Link } from "react-router-dom";
import AllFoods from "../../fakeData/index.js";
import FoodItem from "../FoodItem/FoodItem";
import { useState, useEffect } from "react";
const SearchResult = () => {
  const [AllFoods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const response = await fetch(
      "https://641474f736020cecfda920f8.mockapi.io/api/v1/food"
    );
    const data = await response.json();
    setFoods(data);
    setFilteredFoods(data);
  };
  const { searchQuery } = useParams();
  const SearchResult = AllFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <section className="food-area my-5">
      <div className="container">
        <h3 className="text-center search-res-title">Search Result</h3>
        <div className="row my-5">
          {SearchResult.map((food) => (
            <FoodItem key={food.id} food={food}></FoodItem>
          ))}
          {SearchResult.length === 0 && (
            <h1 className="col-12 display-5 text-center">Không tìm thấy món ăn nào!</h1>
          )}
        </div>

        <div className="text-center">
          <Link to="/">
            <button className="btn btn-danger">Xem tất cả món ăn</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
