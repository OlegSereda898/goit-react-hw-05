import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "bdd4d8b5e1628c981a443600cb7be2b7";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    axios
      .get(`${API_URL}${movieId}/reviews`, { params: { api_key: API_KEY } })
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.error("ERROR:", error));
  }, [movieId]);

  return (
    <div>
      <h2 className={css.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={css.text}>
                <strong>{review.author}</strong>: {review.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default MovieReviews;
