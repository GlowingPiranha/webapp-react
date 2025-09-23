import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1">404</h1>
      <h2>Pagina non trovata</h2>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Torna alla Home
      </Link>
    </div>
  );
}
