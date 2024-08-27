import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationMenu";
import SearchBox from "./Components/SearchBox";
import MovieRow from "./Components/MovieRow";
import MovieDetailsModal from "./Components/MovieDetailsModal";
import StreamList from "./Components/StreamList";
import Movies from "./Components/Movies";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Favorites from "./Components/Favorites";
import Subscriptions from "./Components/Subscriptions";
import UserEventsLog from "./Components/UserEventsLog"; // Import UserEventsLog component
import { CartProvider } from "./contexts/CartContext";
import "./Styles/App.css";

const API_KEY = "3e8344b6";

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [streamlist, setStreamlist] = useState(() => {
    const storedStreamlist = localStorage.getItem("streamlist");
    return storedStreamlist ? JSON.parse(storedStreamlist) : [];
  });
  const [userEvents, setUserEvents] = useState(() => {
    const storedEvents = localStorage.getItem("userEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  useEffect(() => {
    fetchTrendingMovies();
    fetchRecentlyAddedMovies();
  }, []);

  const logUserEvent = (eventType, details) => {
    const newEvent = {
      id: Date.now(),
      eventType,
      details,
      timestamp: new Date().toISOString(),
    };

    setUserEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("userEvents", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setTrendingMovies(data.Search);
      } else {
        console.error("Failed to fetch trending movies:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchRecentlyAddedMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=new&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setRecentlyAddedMovies(data.Search);
      } else {
        console.error("Failed to fetch recently added movies:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching recently added movies:", error);
    }
  };

  const searchMovies = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        logUserEvent("Search", `Searched for: ${searchTerm}`);
      } else {
        setMovies([]);
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
        logUserEvent("View Details", `Viewed details for: ${data.Title}`);
      } else {
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const toggleFavorite = async (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID)
      );
      logUserEvent("Remove Favorite", `Removed ${movie.Title} from favorites`);
    } else {
      const movieDetailsResponse = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
      );
      const movieDetails = await movieDetailsResponse.json();

      if (movieDetails.Response === "True") {
        const newFavorite = {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movieDetails.Poster,
        };
        setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        logUserEvent("Add Favorite", `Added ${movie.Title} to favorites`);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const addToStreamlist = async (movie) => {
    const isInStreamlist = streamlist.some(
      (stream) => stream.imdbID === movie.imdbID
    );

    if (!isInStreamlist) {
      const movieDetailsResponse = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
      );
      const movieDetails = await movieDetailsResponse.json();

      if (movieDetails.Response === "True") {
        const newStreamlistItem = {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movieDetails.Poster,
        };
        setStreamlist((prevStreamlist) => [
          ...prevStreamlist,
          newStreamlistItem,
        ]);
        logUserEvent("Add to Streamlist", `Added ${movie.Title} to streamlist`);
      }
    }
    localStorage.setItem("streamlist", JSON.stringify(streamlist));
  };

  const handleRemoveFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== movieId)
    );
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content-container">
            <div className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <SearchBox onSearch={searchMovies} />
                      {/* Search Results */}
                      {movies.length > 0 && (
                        <div className="movie-row">
                          <MovieRow
                            title="Search Results"
                            movies={movies}
                            onSelectMovie={fetchMovieDetails}
                            onFavorite={toggleFavorite}
                            onAddToStreamlist={addToStreamlist}
                            favorites={favorites}
                          />
                        </div>
                      )}
                      {/* Trending Now */}
                      <div className="movie-row">
                        <MovieRow
                          title="Trending Now"
                          movies={trendingMovies}
                          onSelectMovie={fetchMovieDetails}
                          onFavorite={toggleFavorite}
                          onAddToStreamlist={addToStreamlist}
                          favorites={favorites}
                        />
                      </div>
                      {/* Recently Added */}
                      <div className="movie-row">
                        <MovieRow
                          title="Recently Added"
                          movies={recentlyAddedMovies}
                          onSelectMovie={fetchMovieDetails}
                          onFavorite={toggleFavorite}
                          onAddToStreamlist={addToStreamlist}
                          favorites={favorites}
                        />
                      </div>
                      {/* Favorites */}
                      {favorites.length > 0 && (
                        <div className="favorites-section">
                          <h2>Your Favorites</h2>
                          <div className="favorites-grid">
                            {favorites.map((movie) => (
                              <div key={movie.imdbID} className="favorite-item">
                                <img
                                  src={movie.Poster}
                                  alt={movie.Title}
                                  className="movie-poster"
                                />
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  }
                />
                <Route path="/streamlist" element={<StreamList movies={streamlist} />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      favorites={favorites}
                      onRemoveFavorite={handleRemoveFavorite}
                    />
                  }
                />
                <Route path="/subscriptions" element={<Subscriptions />} />
              </Routes>
              {/* Display User Events Log */}
              <UserEventsLog events={userEvents} />
            </div>
          </div>

          {selectedMovie && (
            <MovieDetailsModal
              details={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;






