import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

const API_KEY = "e8020e4f";
const defaultMovieIds = [
  "tt2911666", 
  "tt0103064", 
  "tt0133093",
];

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        const moviePromises = defaultMovieIds.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`).then((res) => res.json())
        );
        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies([data]); 
      } else {
        setError("Movie not found.");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search movie (e.g. Chaava)"
          className="search-input"
          type="text"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={{
              title: movie.Title,
              release_date: movie.Year,
              url: movie.Poster !== "N/A" ? movie.Poster : "",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Movie;
