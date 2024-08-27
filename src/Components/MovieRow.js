import React from "react";

function MovieRow({ title, movies, onSelectMovie, onFavorite, favorites }) {
  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movies">
        {movies.map((movie) => {
          const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

          return (
            <div key={movie.imdbID} className="movie">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
                style={{ width: "150px", height: "225px", objectFit: "cover" }}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button onClick={() => onSelectMovie(movie.imdbID)}>Details</button>
              <button onClick={() => onFavorite(movie)}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieRow;
