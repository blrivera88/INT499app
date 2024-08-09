import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import SearchBox from "./Components/SearchBox";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import "./Styles/App.css"; 

const API_KEY = "3e8344b6";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [favorites, setFavorites] = useState([]); // New state for favorites

  const searchMovies = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setUserEvents([...userEvents, `Searched for: ${searchTerm}`]);
      } else {
        setMovies([]);
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    // Implement your fetchMovieDetails logic here
  };

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SearchBox onSearch={searchMovies} />
      <MovieList movies={movies} onSelectMovie={fetchMovieDetails} onFavorite={addToFavorites} />
      {selectedMovie && <MovieDetails details={selectedMovie} />}
      <div>
        <h2>User Events:</h2>
        <ul>
          {userEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Favorites:</h2>
        <ul>
          {favorites.map((movie) => (
            <li key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;



