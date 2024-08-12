import React from "react";
import MovieInfo from "./MovieInfo";
import styles from "../Styles/MovieDetails.module.css";

function MovieDetails({ details }) {
  return (
    <div className={styles.container}>
      <MovieInfo
        title={details.Title}
        year={details.Year}
        genre={details.Genre}
        plot={details.Plot}
        actors={details.Actors}
        language={details.Language}
        awards={details.Awards}
        poster={details.Poster}
      />
    </div>
  );
}

export default MovieDetails;

