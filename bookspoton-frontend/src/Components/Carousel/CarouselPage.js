import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const movies = [
  {
    title: "Satyaprem Ki Katha",
    description:
      "A young dreamer Satyaprem gets married to the woman he loves, Katha, but she`s holding on to a secret that`s not easy to let go of. What will happen when Sattu uncovers the truth?",
    duration: 2.26,
    language: "Hindi",
    release_date: "2023-06-29",
    director: "Sameer Vidwans",
    genre: "Drama",
    cast: "Kartik Aaryan, Kiara Adavani",
    image: "https://i.ytimg.com/vi/8EPJiFfWRfw/maxresdefault.jpg",
    ratings: 9.4,
  },
  {
    title: "Barbie",
    description:
      "To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or you`re a Ken.",
    genre: "Adventure",
    duration: 1.54,
    language: "English",
    release_date: "2023-07-21",
    director: "Greata Gerwig",
    cast: "Margot Robbie, Ryan Gosling",
    // Correct the image URL for the "Barbie" movie
    image:
      "https://m.media-amazon.com/images/M/MV5BNzJjZDdiMTUtNDRhOS00MGIzLWE3ZjAtZTRjMTk2ZDBlYWU5XkEyXkFqcGdeQWFkcmllY2xh._V1_.jpg",
    ratings: 9.2,
  },
  {
    title: "Oppenheimer",
    description:
      "The film is based on the Pulitzer Prize-winning book American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer by Kai Bird and the late Martin J. Sherwin.",
    genre: "Biography",
    duration: 3.1,
    language: "English",
    release_date: "2023-07-21",
    director: "Christopher Nolan",
    cast: "Callian Murphy,Emily Blunt",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRNwPYOOHJOhydeFKJbgJNAwrg1a5ypFKL-Q&usqp=CAU",
    ratings: 9.4,
  },
  {
    title: "MIssion Imposible:Dead Reckoning-Part One",
    description:
      "In Mission: Impossible - Dead Reckoning Part One, Ethan Hunt (Tom Cruise) and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands.",
    genre: "Action",
    duration: 2.45,
    language: "English",
    release_date: "2023-07-12",
    director: "Christopher McQuarrie",
    cast: "Tom Cruise, Hayley Atwell",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00329481-qwulpftqfe-landscape.jpg",
    ratings: 9.6,
  },

  {
    title: "Baipan Bhari deva",
    description:
      "Bai Pan is a story of six estranged sisters who are forced to come together for a Managalaguar competition. Can they overcome their past and face their struggles?",
    genre: "Comedy,Drama",
    duration: 2.17,
    language: "Matathi",
    release_date: "2017-07-19",
    director: "Kedar Shinde",
    cast: "Rohini Hattangadi, Vandana Gupte",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00355365-jmhaegtxdt-landscape.jpg",
    ratings: 9.9,
  },
];

const CarouselPage = () => {
    return (
        <div className="carousel-container">
            <Carousel showArrows={true} infiniteLoop={true} autoPlay={true}>
                {movies.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <img src={movie.image} alt={movie.title} />
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <p>Rating: {movie.ratings}</p>
                            <p>Genre: {movie.genre}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default CarouselPage