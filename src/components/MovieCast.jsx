import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "bdd4d8b5e1628c981a443600cb7be2b7";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${movieId}/credits`, {
        params: { api_key: API_KEY },
      })
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error("ERROR:", error));
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {cast.map((actor) => (
          <li key={actor.id} style={{ margin: "10px", textAlign: "center" }}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                style={{ width: "150px", height: "225px", borderRadius: "5px" }}
              />
            ) : (
              <img
                src="https://via.placeholder.com/150x225?text=No+Image"
                alt="No image"
                style={{ width: "150px", height: "225px", borderRadius: "5px" }}
              />
            )}
            <div>
              <strong>{actor.name}</strong>
              <p>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
