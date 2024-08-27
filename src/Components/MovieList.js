import React from "react";
import styles from "../Styles/MovieList.module.css";

function MovieList({ movies, onSelectMovie, onFavorite }) {
  return (
    <div className={styles.searchList}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.imdbID}
            className={styles.searchListItem}
            onClick={() => onSelectMovie(movie.imdbID)}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/path/to/image_not_found.png"
              }
              alt={movie.Title}
              className={styles.moviePoster}
            />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button onClick={() => onFavorite(movie)}>Add to Favorites</button>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found. Try a different search.</p>
      )}
    </div>
  );
}

export default MovieList;


