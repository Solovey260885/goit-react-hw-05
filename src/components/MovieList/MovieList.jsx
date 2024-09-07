import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>No movies to display</p>;
  }
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            className={css.movieListLink}
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
