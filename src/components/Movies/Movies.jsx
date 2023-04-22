import { useState, useEffect } from 'react';
import { fetchSerchQuery } from 'services/api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useSearchParams();

  useEffect(() => {
    const query = searchQuery.get('query');
    async function fetchData() {
      const responce = await fetchSerchQuery(query);
      if (responce.results.length === 0) {
        return;
      } else {
        setMovies(() => {
          return [...responce.results];
        });
      }
    }
    fetchData();
  }, [searchQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.query.value;
    if (query !== '') {
      setSearchQuery({ query: e.target.query.value });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="query" autoComplete="off" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {!movies.length
          ? null
          : movies.map(movie => {
              return (
                <li key={movie.id}>
                  <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                    <span>{movie.title}</span>
                  </Link>
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default Movies;
