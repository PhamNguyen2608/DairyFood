import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./button.css";
import ButtonDelete from "../ButtonDelete/ButtonDelete"
const DairyFoodItem = (props) => {
  const { id, name, description, img } = props.food;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await fetch(
      `https://641474f736020cecfda920f8.mockapi.io/api/v1/dairyFood/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("Data deleted successfully");
    } else {
      console.log("Data deleting failed");
    }

    setIsDeleting(false);
  };

  return (
    <div className="col-md-4 mb-4">
      <Link to={"food/" + id}>
        <div className="card text-center">
          <img src={img} alt="FoodItem" className="card-img-top" />
          <div className="card-body">
            <h5>{name}</h5>
            <p>{description}</p>
          </div>
          <Button />
        </div>
      </Link>
      <ButtonDelete
        onClick={handleDelete}
        text={isDeleting ? "Đang xóa..." : "Xóa"}
        disabled={isDeleting}
      />
    </div>
  );
};

export default DairyFoodItem;
