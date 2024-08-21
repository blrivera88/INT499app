import React from "react";
import styles from "../Styles/MovieInfo.module.css";

function MovieInfo({ title, year, genre, plot, actors, language, awards, poster }) {
  return (
    <div className={styles.movieInfo}>
      <img
        src={poster !== "N/A" ? poster : "assets/image_not_found.png"}
        alt={`${title} poster`}
        className={styles.moviePoster}
      />
      <div className={styles.details}>
        <h3>{title}</h3>
        <p>Year: {year}</p>
        <p>Genre: {genre}</p>
        <p>Actors: {actors}</p>
        <p>Plot: {plot}</p>
        <p>Language: {language}</p>
        <p>Awards: {awards}</p>
      </div>
    </div>
  );
}

export default MovieInfo;
