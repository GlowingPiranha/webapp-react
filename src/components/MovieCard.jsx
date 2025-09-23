import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="card h-100">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`http://localhost:3000/${movie.image}`}
          className="card-img-top"
          alt={movie.title}
          style={{ height: "600px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">
          {movie.title}
        </h5>
        <p className="card-text">{movie.abstract}</p>
      </div>
    </div>
  );
}
