import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./style.css";
const Rating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(index) {
    console.log(index);
    setRating(index);
  }
  function handleMouseMove(index) {
    setHover(index);
  }
  function handleMouseLeave() {
    setHover(rating);
  }
  return (
    <>
      <div className="star-rating">
        {[...Array(noOfStars)].map((_, index) => {
          index += 1;
          return (
            <FaStar
              key={index}
              className={index <= (hover || rating) ? "active" : "inactive"}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseMove(index)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
            />
          );
        })}
      </div>
    </>
  );
};

export default Rating;
