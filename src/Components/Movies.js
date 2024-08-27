import React, { useState } from "react";

const API_KEY = "3e8344b6"; 

function Movies({ onAddToFavorites, onAddToStreamlist, onShowMovieDetails }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovies(data.Search);
          setError(null); // Clear any previous errors
        } else {
          setMovies([]);
          setError("No movies found");
        }
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("An error occurred while fetching data.");
      }
    } else {
      setError("Please enter a search term");
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const handleAddToFavorites = (movie) => {
    onAddToFavorites(movie);
  };

  const handleAddToStreamlist = (movie) => {
    onAddToStreamlist(movie);
  };

  const handleShowDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.Response === "True") {
        onShowMovieDetails(data);
      } else {
        console.error("Failed to fetch movie details:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="movies-list">
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
                  alt={movie.Title}
                  style={{ width: "200px", height: "auto" }}
                />
                <div>
                  <h3>{movie.Title}</h3>
                  <p>Year: {movie.Year}</p>
                  <p>Type: {movie.Type}</p>
                  <button onClick={() => handleAddToFavorites(movie)}>
                    Add to Favorites
                  </button>
                  <button onClick={() => handleAddToStreamlist(movie)}>
                    Add to Streamlist
                  </button>
                  <button onClick={() => handleShowDetails(movie.imdbID)}>
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No movies found. Please try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
