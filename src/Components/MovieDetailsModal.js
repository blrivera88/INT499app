import React from "react";
import MovieInfo from "./MovieInfo";
import styles from "../Styles/MovieDetailsModal.module.css";

function MovieDetailsModal({ details, onClose }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
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
        <div className={styles.modalBody}>
          <h3>Director:</h3>
          <p>{details.Director}</p>
          <h3>Rating:</h3>
          <p>{details.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
