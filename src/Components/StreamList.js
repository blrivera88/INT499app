import React, { useState } from "react";

function StreamList({ onUserInput }) {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
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
        setMovies((prevMovies) => [
          ...prevMovies,
          { id: Date.now(), title: input, isCompleted: false },
        ]);
      }
      setInput(""); // Clear the input field after submission
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter movie title..."
        />
        <button type="submit">{isEditing ? "Update Movie" : "Add Movie"}</button>
      </form>
      <div className="user-events">
        <h2>Stream List Movies:</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} style={{ textDecoration: movie.isCompleted ? "line-through" : "none" }}>
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




