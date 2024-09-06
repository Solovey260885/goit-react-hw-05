import { useState, useEffect } from "react";
import { getSearchMovies } from "../../movies-api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);

  const [params, setParams] = useSearchParams();
  const queryParam = params.get("query") || "";
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [queryParam]);

  const fetchMovies = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setInputError(null);

    try {
      const data = await getSearchMovies(searchQuery);
      setMovies(data.results || []);
    } catch (error) {
      setError(error, "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setInputError("Please enter a search value.");
      return;
    }

    params.set("query", query);
    setParams(params);

    fetchMovies(query);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      {inputError && <p style={{ color: "red" }}>{inputError}</p>}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && movies.length === 0 && query && (
        <p>No movies found for "{query}"</p>
      )}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
