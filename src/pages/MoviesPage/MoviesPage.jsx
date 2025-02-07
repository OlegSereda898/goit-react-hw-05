import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "../../components/SearchForm/SearchForm";
import css from "./MoviesPage.module.css";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "bdd4d8b5e1628c981a443600cb7be2b7";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    axios
      .get(API_URL, {
        params: { api_key: API_KEY, query },
      })
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error("ERROR:", error));
  }, [query]);

  return (
    <div className={css.container}>
      <SearchForm onSubmit={(value) => setSearchParams({ query: value })} />

      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
