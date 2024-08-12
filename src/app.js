import React, { useState } from "react";
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
import Subscriptions from "./Components/Subscriptions"; // Correct import for Subscriptions component
import { CartProvider } from "./contexts/CartContext"; // Import CartProvider
import "./Styles/App.css";

const API_KEY = "3e8344b6";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchMovies = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setUserEvents((prevEvents) => [
          ...prevEvents,
          `Searched for: ${searchTerm}`,
        ]);
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
      } else {
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID)
      );
      setUserEvents((prevEvents) => [
        ...prevEvents,
        `Removed from Favorites: ${movie.Title}`,
      ]);
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
      setUserEvents((prevEvents) => [
        ...prevEvents,
        `Added to Favorites: ${movie.Title}`,
      ]);
    }
  };

  const handleRemoveFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== movieId)
    );
    setUserEvents((prevEvents) => [
      ...prevEvents,
      `Removed from Favorites: ${movieId}`,
    ]);
  };

  const handleUserInput = (input) => {
    setUserEvents((prevEvents) => [
      ...prevEvents,
      `User input: ${input}`,
    ]);
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
                      <div className="movie-rows">
                        <MovieRow
                          title="Trending Now"
                          movies={movies.slice(0, 5)}
                          onSelectMovie={fetchMovieDetails}
                          onFavorite={toggleFavorite}
                          favorites={favorites}
                        />
                        <MovieRow
                          title="Recently Added"
                          movies={movies.slice(5, 10)}
                          onSelectMovie={fetchMovieDetails}
                          onFavorite={toggleFavorite}
                          favorites={favorites}
                        />
                        {/* Add more MovieRow components for other categories */}
                      </div>
                    </>
                  }
                />
                <Route
                  path="/streamlist"
                  element={<StreamList onUserInput={handleUserInput} />}
                />
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
            </div>

            <aside className="sidebar">
              <div className="user-events">
                <h2>User Events:</h2>
                {userEvents.length > 0 ? (
                  <ul>
                    {userEvents.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No user events yet.</p>
                )}
              </div>

              <div className="favorites">
                <h2>Favorites:</h2>
                {favorites.length > 0 ? (
                  <ul>
                    {favorites.map((movie) => (
                      <li key={movie.imdbID}>
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No favorites added yet.</p>
                )}
              </div>
            </aside>
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




