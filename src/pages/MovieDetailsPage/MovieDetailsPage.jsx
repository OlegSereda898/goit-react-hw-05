import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "bdd4d8b5e1628c981a443600cb7be2b7";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    axios
      .get(`${API_URL}${movieId}`, { params: { api_key: API_KEY } })
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("ERROR:", error));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";
  const userScore = movie.vote_average
    ? Math.round(movie.vote_average * 10)
    : "N/A";
  const genres =
    movie.genres?.map((genre) => genre.name).join(", ") ||
    "No genres available";

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.backLink}>
        Go back
      </Link>

      <div className={css.skin}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          width={250}
        />
        <div className={css.info}>
          <h1 className={css.title}>
            {movie.title} ({releaseYear})
          </h1>
          <p className={css.userScore}>User Score: {userScore}%</p>
          <h2 className={css.overview}>Overview</h2>
          <p className={css.text}>{movie.overview}</p>
          <h2 className={css.genres}>Genres</h2>
          <p className={css.text}>{genres}</p>
        </div>
      </div>

      <nav className={css.nav}>
        <h3 className={css.text}>Additional information</h3>
        <Link to="cast" className={css.link}>
          Cast
        </Link>
        <Link to="reviews" className={css.link}>
          Reviews
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
