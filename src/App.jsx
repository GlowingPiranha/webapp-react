import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLoader } from "./context/LoaderContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Loader from "./components/Loader.jsx";

function App() {
  const { loading } = useLoader();

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
