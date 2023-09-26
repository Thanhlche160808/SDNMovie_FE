import React from "react";
import MovieCard from "../card/MovieCard";
import "./style.scss";
function MovieList({ movie }) {
  return (
    <div className="movie_list container">
      {movie?.map((item, index) => {
        return <MovieCard item={item} key={index + "movie"} />;
      })}
    </div>
  );
}

export default MovieList;
