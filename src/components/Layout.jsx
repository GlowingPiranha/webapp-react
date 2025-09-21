import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark p-3">
        <Link className="navbar-brand" to="/">My Movies</Link>
      </nav>
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}
