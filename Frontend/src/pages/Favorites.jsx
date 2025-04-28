import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies</h2>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>My Favorite Movies</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={{
              imdbID: movie.imdbID,
              title: movie.Title || movie.title,
              release_date: movie.Year || movie.release_date,
              url: movie.Poster || movie.url,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
