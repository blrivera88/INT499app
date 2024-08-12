import React from "react";

function Favorites({ favorites, onRemoveFavorite }) {
  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <p>{movie.Genre}</p>
              <img src={movie.Poster} alt={movie.Title} style={{ width: "100px" }} />
              <button onClick={() => onRemoveFavorite(movie.imdbID)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies added yet.</p>
      )}
    </div>
  );
}

export default Favorites;

