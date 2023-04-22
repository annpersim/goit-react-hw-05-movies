import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTrendings } from 'services/api';
import { Heading, MovieList, MovieItem, MovieImage } from './Home.styled';
import { Link } from 'react-router-dom';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const responce = await fetchTrendings();
      setTrending(() => {
        return [...responce.results];
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Heading>Trending today</Heading>
      <MovieList>
        {trending.map(movie => {
          return (
            <MovieItem key={movie.id}>
              <Link to={`movies/${movie.id}`} state={{ from: location }}>
                <MovieImage
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
                <span>{movie.title}</span>
              </Link>
            </MovieItem>
          );
        })}
      </MovieList>
    </>
  );
};

export default Home;
