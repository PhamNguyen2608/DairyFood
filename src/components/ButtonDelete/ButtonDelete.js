import React from "react";

const Button = (props) => {
  const { onClick, text } = props;

  return (
    <button className="btn btn-danger" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
