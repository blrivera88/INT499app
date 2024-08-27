import React, { useState, useEffect } from "react";
import { debounce } from "lodash"; // You may need to install lodash with `npm install lodash`
import "./SearchBox.css"; // Ensure you have the appropriate CSS file for styling

function SearchBox({ onSearch, fetchTrendingMovies }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    if (input.trim()) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
      fetchTrending(); // Fetch trending movies if input is empty
    }
  }, [input]);

  const fetchSuggestions = debounce(async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=3e8344b6`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSuggestions(data.Search);
        setError(null);
      } else {
        setSuggestions([]);
        setError("No movies found.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setSuggestions([]);
      setError("An error occurred while fetching suggestions.");
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const fetchTrending = async () => {
    try {
      const trendingMovies = await fetchTrendingMovies();
      setTrending(trendingMovies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleClearSearch = () => {
    setInput("");
    setSuggestions([]);
    setError(null);
    onSearch("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
      setSuggestions([]);
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      {isLoading && <p>Loading suggestions...</p>}

      {error && <p className="error">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => {
                onSearch(movie.Title);
                setInput(movie.Title);
                setSuggestions([]);
              }}
            >
              <img src={movie.Poster} alt={movie.Title} className="movie-thumbnail" />
              <div className="movie-info">
                <strong>{movie.Title}</strong> ({movie.Year})
                <p>Type: {movie.Type}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {input === "" && trending.length > 0 && (
        <div className="trending-section">
          <h3>Trending Now</h3>
          <ul className="trending-list">
            {trending.map((movie) => (
              <li
                key={movie.imdbID}
                onClick={() => {
                  onSearch(movie.Title);
                  setInput(movie.Title);
                  setSuggestions([]);
                }}
              >
                <img src={movie.Poster} alt={movie.Title} className="movie-thumbnail" />
                <div className="movie-info">
                  <strong>{movie.Title}</strong> ({movie.Year})
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
