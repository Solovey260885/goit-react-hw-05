import { useRef, useEffect, useState, Suspense } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";

import { getMovieDetails } from "../../movies-api";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message || "Error fetching data");
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
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>No movie details available</p>;
  }

  return (
    <div className={css.movieDetailWrap}>
      <Link to={backLinkRef.current} className={css.btn}>
        Go back
      </Link>

      <h1 className={css.title}>{movie.title}</h1>
      <div className={css.poster}>
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <p className={css.textOverview}>{movie.overview}</p>
      </div>
      <div className={css.castReviewsWrap}>
        <NavLink
          to="cast"
          className={(props) => {
            return clsx(css.link, props.isActive && css.active);
          }}
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          className={(props) => {
            return clsx(css.link, props.isActive && css.active);
          }}
        >
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<p className={css.textWarning}>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
