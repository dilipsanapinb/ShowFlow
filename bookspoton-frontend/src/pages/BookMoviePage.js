import React, { useEffect, useState } from "react";
import axios from "axios";
import TheaterCard from "../Components/Theatre/TheaterCard";

const BookMoviePage = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // Fetch theaters and show information from the API or use static data
    axios.get("http://127.0.0.1:5000/api/theaters").then((response) => {
      setTheaters(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Available Theaters</h1>
      <div style={{ display: "flex" }}>
        {theaters.map((theater, index) => (
          <TheaterCard
            key={index}
            theaterName={theater.name}
            shows={theater.shows}
          />
        ))}
      </div>
    </div>
  );
};

export default BookMoviePage;
