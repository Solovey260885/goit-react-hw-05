import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>No movies to display</p>;
  }
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
