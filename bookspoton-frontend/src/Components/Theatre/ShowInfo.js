import React from "react";

const ShowInfo = ({ show }) => {
  return (
    <div>
      <p>Show Time: {show.showTime}</p>
      <p>Price: {show.price}</p>
      {/* Add more show information here if needed */}
    </div>
  );
};

export default ShowInfo;
