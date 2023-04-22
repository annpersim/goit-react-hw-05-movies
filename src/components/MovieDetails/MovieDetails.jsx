import { useParams, useLocation, Outlet, Link } from 'react-router-dom';
import { useRef, useState, useEffect, Suspense } from 'react';
import { fetchMovieDetails } from 'services/api';
import { StyledLink } from './MoviesDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');

  const [{ title, img, year, score, overview, genres }, setState] = useState({
    title: '',
    img: '',
    year: '',
    score: '',
    overview: '',
    genres: [],
  });

  useEffect(() => {
    async function fetchData() {
      const responce = await fetchMovieDetails(movieId);
      setState({
        title: responce.title,
        img: `https://image.tmdb.org/t/p/w300/${responce.poster_path}`,
        year: responce.release_date.slice(0, 4),
        score: `${Math.round(responce.vote_average * 10)}%`,
        overview: responce.overview,
        genres: responce.genres.map(genre => {
          return genre.name;
        }),
      });
    }
    fetchData();
  }, [movieId]);

  return (
    <>
      <Link to={backLink.current} style={{ margin: '0 10px' }}>
        Go Back
      </Link>
      <div
        style={{
          display: 'flex',
        }}
      >
        <img
          style={{ margin: '0 10px' }}
          src={`${img}`}
          alt={`${title} poster`}
        />
        <div>
          <h2>{`${title} (${year})`} </h2>
          <p>User Score: {score}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.join(', ')}</p>
        </div>
      </div>
      <hr />
      <div>
        <p style={{ margin: '0 10px' }}>Additional information</p>
        <ul>
          <li>
            <StyledLink to="cast">Cast</StyledLink>
          </li>
          <li>
            <StyledLink to="reviews">Reviews</StyledLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
