import React, { useState } from "react";
import "./Ratting.css"
function Rating() {
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    setComments([...comments, comment]);
    e.target.comment.value = "";
  };

  return (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        <div className="comment">
          <ul className="review-list">
            {comments.map((comment, index) => (
              <li key={index} className="review-list__item">
                {comment}
              </li>
            ))}
          </ul>
        </div>

        <label className="review-form__label">
          Đánh giá của bạn:
          <input type="text" name="comment" className="review-form__input" />
        </label>
        <button type="submit" className="review-form__button">
          Gửi
        </button>
      </form>
    </div>
  );
}

export default Rating;
