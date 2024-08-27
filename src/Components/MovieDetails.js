import React from "react";
import MovieInfo from "./MovieInfo";
import styles from "../Styles/MovieDetails.module.css";

function MovieDetails({ details }) {
  return (
    <div className={styles.container}>
      <MovieInfo
        title={details.title} // TMDB uses 'title'
        year={new Date(details.release_date).getFullYear()} // Convert release_date to year
        genre={details.genres.map((genre) => genre.name).join(", ")} // Genres array to string
        plot={details.overview} // TMDB uses 'overview' for plot
        actors={details.credits.cast.slice(0, 5).map((actor) => actor.name).join(", ")} // Get top 5 actors
        language={details.original_language.toUpperCase()} // TMDB uses 'original_language'
        awards={details.vote_average} // You can replace this with something else if needed
        poster={`https://image.tmdb.org/t/p/w500${details.poster_path}`} // TMDB poster URL
      />
    </div>
  );
}

export default MovieDetails;


