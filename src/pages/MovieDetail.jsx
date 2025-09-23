import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, getMovies } from "../services/api";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  useEffect(() => {
    getMovieById(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("errore nel caricamento del film");
        setLoading(false);
      })
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Film non trovato</p>

  const average =
    movie.reviews && movie.reviews.length > 0
      ? movie.reviews.reduce((sum, r) => sum + r.vote, 0) / movie.reviews.length
      : 0;


  const currentIndex = movies.findIndex((m) => m.id === movie.id);
  const prevMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;
  const nextMovie =
    currentIndex < movies.length - 1 ? movies[currentIndex + 1] : null;

  return (


    <>

      <div className="mb-3 d-flex justify-content-between">
        {prevMovie && (
          <Link to={`/movies/${prevMovie.id}`} className="btn btn-primary">
            &larr; Previous movie
          </Link>
        )}
        {nextMovie && (
          <Link to={`/movies/${nextMovie.id}`} className="btn btn-primary ms-auto">
            Next movie &rarr;
          </Link>
        )}
      </div>
      {/* Card Film */}
      <div className="card shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <img
              src={`http://localhost:3000/${movie.image}`}
              alt={movie.title}
              className="m-3 img-fluid rounded"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          {/* Card Text */}
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title display-4 fw-normal">
                {movie.title}{" "}
                <small className="text-muted">({movie.release_year})</small>
              </h1>

              {/* Media voti */}
              <div className="p-3 fs-5">
                <strong>Vote:</strong>{" "}
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={i < Math.round(average) ? "fas fa-star" : "far fa-star"}
                    style={{ color: i < Math.round(average) ? "#ffc107" : "#e4e5e9", marginRight: "2px" }}
                  ></i>
                ))}
              </div>

              <p className="card-text p-3 fs-2">{movie.director}</p>
              <p className="card-text p-3 fs-2">{movie.genre}</p>
              <p className="card-text p-3 fs-2">{movie.abstract}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recensioni */}
      <h4 className="mb-3 py-2 fs-3">Reviews</h4>
      {movie.reviews && movie.reviews.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {movie.reviews.map((review) => (
            <div key={review.id} className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  <strong>{review.name}</strong>
                </h6>
                <p className="card-text mb-1">{review.text}</p>

                {/* Stelle del voto usando FontAwesome */}
                <div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={i < review.vote ? "fas fa-star" : "far fa-star"} // piena o vuota
                      style={{ color: i < review.vote ? "#ffc107" : "#e4e5e9", marginRight: "2px" }}
                    ></i>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nessuna recensione disponibile</p>
      )}
    </>
  );
}




