import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
