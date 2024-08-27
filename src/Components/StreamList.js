import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce"; // Import debounce for better handling of input changes

function StreamList() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState(() => {
    const storedMovies = localStorage.getItem("streamListMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("streamListMovies", JSON.stringify(movies));
  }, [movies]);

  const fetchMovieSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true); // Set loading to true when starting to fetch

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=3e8344b6`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSuggestions(data.Search);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching movie suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false); // Set loading to false when the fetch is done
    }
  };

  // Debounce input change to avoid too many API calls
  const debouncedFetchSuggestions = useCallback(debounce(fetchMovieSuggestions, 500), []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    debouncedFetchSuggestions(value);
  };

  const handleClearInput = () => {
    setInput("");
    setSuggestions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      if (isEditing) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === currentMovie.id ? { ...movie, title: input } : movie
          )
        );
        setIsEditing(false);
        setCurrentMovie(null);
      } else {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?t=${input}&apikey=3e8344b6`
          );
          const data = await response.json();

          if (data.Response === "True") {
            const newMovie = {
              id: Date.now(),
              title: data.Title,
              poster: data.Poster,
              isCompleted: false,
            };
            setMovies((prevMovies) => [...prevMovies, newMovie]);
          } else {
            alert("Movie not found");
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
      setInput("");
    }
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setInput(movie.title);
    setCurrentMovie(movie);
  };

  const handleDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const handleComplete = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isCompleted: !movie.isCompleted } : movie
      )
    );
  };

  return (
    <div className="stream-list">
      <h1>Stream List</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter movie title..."
          className="search-input"
        />
        {input && <button type="button" onClick={handleClearInput} className="clear-button">X</button>}
        <button type="submit" className="submit-button">{isEditing ? "Update Movie" : "Add Movie"}</button>
      </form>
      {loading && <div className="loading">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((movie) => (
            <li key={movie.imdbID} onClick={() => setInput(movie.Title)}>
              <img src={movie.Poster} alt={movie.Title} style={{ width: "50px", marginRight: "10px" }} />
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      )}
      <div className="user-events">
        <h2>Stream List Movies:</h2>
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{
                textDecoration: movie.isCompleted ? "line-through" : "none",
              }}
            >
              <img src={movie.poster} alt={movie.title} style={{ width: "50px", marginRight: "10px" }} />
              {movie.title}
              <button onClick={() => handleComplete(movie.id)}>
                {movie.isCompleted ? "Undo" : "Watch"}
              </button>
              <button onClick={() => handleEdit(movie)}>Edit</button>
              <button onClick={() => handleDelete(movie.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;



