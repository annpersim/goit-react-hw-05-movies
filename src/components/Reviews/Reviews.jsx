import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchReviews } from 'services/api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const responce = await fetchReviews(movieId);
      setReviews([...responce.results]);
    }
    fetchData();
  }, [movieId]);

  return (
    <>
      {reviews.length === 0 && (
        <p style={{ margin: '0 10px' }}>There is no review for this movie</p>
      )}
      <ul>
        {reviews.length > 0 &&
          reviews.map(review => {
            return (
              <li key={review.id}>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Reviews;
