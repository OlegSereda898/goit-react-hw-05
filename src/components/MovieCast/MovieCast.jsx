import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "bdd4d8b5e1628c981a443600cb7be2b7";
const defaultImg =
  "https://dummyimage.com/150x225/cdcdcd/000.jpg&text=No+photo";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    axios
      .get(`${API_URL}${movieId}/credits`, { params: { api_key: API_KEY } })
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error("ERROR:", error));
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Cast</h2>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              className={css.actorImage}
            />
            <div className={css.actorInfo}>
              <strong className={css.actorName}>{actor.name}</strong>
              <p className={css.actorCharacter}>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
