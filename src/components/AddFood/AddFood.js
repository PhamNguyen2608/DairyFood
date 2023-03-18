import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../ButtonAdd/Button"
import "./AddFood.css";

export function AddFood() {
  const [food, setFood] = useState({
    id: uuidv4(),
    name: "",
    restaurant: "",
    category: "",
    img: "",
    description: "",
    story: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://641474f736020cecfda920f8.mockapi.io/api/v1/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFood({
          id: uuidv4(),
          name: "",
          restaurant: "",
          category: "",
          img: "",
          description: "",
          story: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1 className="my-order-heading">Thêm món ăn</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            name="id"
            value={food.id}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name">Tên món ăn:</label>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="restaurant">Restaurant:</label>
          <input
            type="text"
            name="restaurant"
            value={food.restaurant}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={food.category}
            onChange={handleInputChange}
          >
            <option value="">Chọn loại món ăn</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="breakfast">Breakfast</option>
          </select>
        </div>
        <div>
          <label htmlFor="img">Hình ảnh URL:</label>
          <input
            type="text"
            name="img"
            value={food.img}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Mô tả:</label>
          <input
            type="text"
            name="description"
            value={food.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="story">Cách nấu:</label>
          <input
            type="text"
            name="story"
            value={food.story}
            onChange={handleInputChange}
            className="story-input"
            rows="4"
          />
        </div>
        <div class="button-container">
          <Button />
        </div>
      </form>
    </div>
  );
}
