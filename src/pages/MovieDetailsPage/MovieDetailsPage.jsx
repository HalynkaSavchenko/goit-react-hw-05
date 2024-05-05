import { Suspense } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { getDataById } from '../../tmbd-api';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader'

const navLinkClass =({isActive}) => {
    return clsx(css.link, isActive && css.active)
}

export default function MovieDetailsPage() {
    const {movieId} = useParams();

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [movie, setMovie] = useState(false);

    const location = useLocation();
    const backLinkUrlRef = useRef(location.state ?? '/')

    useEffect(()=>{
        async function getFilmById () {
            try {
                setError(false);
                setLoader(true);
                const response = await getDataById(movieId);
                console.log(response)
                setMovie(response.data)
            } catch (error) {
                setError(true);
            }
            finally {
                setLoader(false);
            }

        }
        getFilmById()
    },[movieId]);

    return (
        <div className={css.container}>
            {error && <ErrorMessage/>}
            {loader && <Loader/>}
             <Link className={css.link} to={backLinkUrlRef.current}>Повернутися</Link>     
          <div>
            <div className={css.background} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
           </div>
            <div className={css.poster}>
                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.original_title} />
            </div>
            <div className={css.info}>
                <h2 className={css.title}>{movie.title}</h2>
                <p className={css.text}>Реліз {movie.release_date}</p>
                <ul className={css.genres}>{movie.genres && movie.genres.map((genre)=>(
                    <li key={genre.id}>
                        <p className={css.text}>{genre.name}</p>
                    </li>
                ))}</ul>
                <p className={css.text}>Оцінка користувачів <span className={css.rating}>{movie.vote_average}</span></p>
                <h3>Опис</h3>
                <p className={css.text}>{movie.overview}</p>
            </div>
          </div>
          <ul className={css.nav}>
            <li>
                <NavLink to='cast' className={navLinkClass}>Актори</NavLink>
            </li>
            <li>
                <NavLink to='reviews' className={navLinkClass}>Відгуки</NavLink>
            </li>
          </ul>
          <Suspense fallback={<div><p>Please wait loading page...</p></div>}>
             <Outlet/>
          </Suspense>
         
        </div>
        
    )
}
