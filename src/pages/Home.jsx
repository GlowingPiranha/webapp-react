import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div className="row">
      {movies.map(movie => (
        <div key={movie.id} className="col-md-4 mb-3">
          <MovieCard movie={movie} />
        </div>
      ))}

    </div>
  );
}