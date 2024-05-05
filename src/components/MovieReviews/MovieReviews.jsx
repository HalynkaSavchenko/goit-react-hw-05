import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataReviews } from '../../tmbd-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
    const {movieId} = useParams();

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState(null);

    useEffect(()=> {
        async function getReviews () {
            try {
                setError(false);
                setLoader(true);
                const response = (await getDataReviews(movieId)).data.results
                setReviews(response)
            } catch (error) {
                setError(true);
            }
            finally {
                setLoader(false);
            }
        }
        getReviews()
    },[movieId]);
    return (
        <div>
            {error && <ErrorMessage/>}
            {loader && <Loader/>}
            <ul>
            {reviews ? (
                    reviews.length !== 0 ? (
                        reviews.map((review) => (
                            <li key={review.id}>
                                <h4>{review.author}</h4>
                                <p>{review.content}</p>
                            </li>
                        ))
                    ) : (
                        <span>На цей фільм поки що немає відгуків</span>
                    )
                ) : null}
            </ul>
        </div>
    )
}