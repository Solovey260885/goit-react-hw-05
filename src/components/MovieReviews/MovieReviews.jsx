import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results || []);
      } catch (error) {
        setError(error, "Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={css.reviewsWrap}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h3 className={css.reviewsTitleAuthor}>{review.author}</h3>
            <p className={css.reviewsContent}>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
