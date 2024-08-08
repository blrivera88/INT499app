import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import SearchBox from "./Components/SearchBox";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import "./Styles/App.css";

const API_KEY = "YOUR_ACTUAL_API_KEY"; // Replace with your API key

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Clear movies on error
    }
  };

  const fetchMovieDetails = async (movieId) => {
    // ... (your existing fetchMovieDetails logic)
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SearchBox onSearch={searchMovies} />
      <MovieList movies={movies} onSelectMovie={fetchMovieDetails} />
      {selectedMovie && <MovieDetails details={selectedMovie} />}
    </div>
  );
}

export default App;