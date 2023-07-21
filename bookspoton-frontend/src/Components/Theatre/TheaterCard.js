import React from "react";
import ShowInfo from "./ShowInfo";

const TheaterCard = ({ theaterName, shows }) => {
  return (
    <div>
      <h3>{theaterName}</h3>
      {shows.map((show, index) => (
        <ShowInfo key={index} show={show} />
      ))}
    </div>
  );
};

export default TheaterCard;
