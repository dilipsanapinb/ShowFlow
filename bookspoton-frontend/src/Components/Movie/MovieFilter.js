// MovieFilter.js
import React, { useState } from "react";
import './MoviesFilter.css'
const MovieFilter = ({ genres, languages, onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilterChange({
      genre: event.target.value,
      language: selectedLanguage,
      rating: selectedRating,
    });
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    onFilterChange({
      genre: selectedGenre,
      language: event.target.value,
      rating: selectedRating,
    });
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    onFilterChange({
      genre: selectedGenre,
      language: selectedLanguage,
      rating: event.target.value,
    });
  };

  return (
    <div className="movie-filter">
      {/* <h2>Filters</h2> */}
      <div>
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">All</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="rating">Ratings:</label>
        <select
          id="rating"
          value={selectedRating}
          onChange={handleRatingChange}
        >
          <option value="">All</option>
          <option value="9.0+">9.0+</option>
          <option value="8.0+">8.0+</option>
          <option value="7.0+">7.0+</option>
        </select>
      </div>
    </div>
  );
};

export default MovieFilter;
