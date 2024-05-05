import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataCast } from '../../tmbd-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MovieCast.module.css'


export default function MovieCast() {
    const {movieId} = useParams();

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [cast, setCast] = useState(null);

    useEffect(()=> {
        async function getCast () {
            try {
                setError(false);
                setLoader(true);
                const response = (await getDataCast(movieId)).data.cast;
                setCast(response);
            } catch (error) {
                setError(true);   
            }
            finally {
                setLoader(false);
            }
        }
        getCast()
    }, [movieId]);

    return ( 
        <div>
            {error && <ErrorMessage/>}
            {loader && <Loader/>}
            <ul className={css.container}>
                {cast && cast.map((cast) => {
                     if (cast.profile_path) {
                        return (
                         <li className={css.item} key={cast.id}>
                              <img className={css.image} src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} alt={cast.name} />
                              <h4 className={css.name}>{cast.name}</h4>
                              <p className={css.text}>{cast.character}</p>
                         </li>
                        )
                    }
                }   
                )}
            </ul>
        </div>
    )
}