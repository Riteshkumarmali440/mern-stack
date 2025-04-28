import React from 'react';
import "../css/MovieCard.css";

function MovieCard({ movie }) {
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const index = favorites.findIndex((fav) => fav.imdbID === movie.imdbID);

        if (index === -1) {
            favorites.push({
                imdbID: movie.imdbID,
                Title: movie.title,
                Year: movie.release_date,
                Poster: movie.url,
            });
        } else {
            favorites.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
       alert(index === -1 ? "Added to favorites!" : "Removed from favorites!");
    };

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.url}
                    alt={movie.title}
                    onError={(e) => {
                        e.target.onerror = null;
                    }}
                />
                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={toggleFavorite}>
                        ❤️
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard;
