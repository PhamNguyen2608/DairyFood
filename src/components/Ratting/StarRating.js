import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinStars } from "@fortawesome/free-solid-svg-icons";
import './StarRatting.css'

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FontAwesomeIcon
              icon={
                ratingValue <= (hover || rating) ? faGrinStars : faGrinStars
              }
              className="star"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>
       Bạn cho {rating} <FontAwesomeIcon icon={faGrinStars} className="star" />
      </p>
    </div>
  );
}

export default StarRating;
