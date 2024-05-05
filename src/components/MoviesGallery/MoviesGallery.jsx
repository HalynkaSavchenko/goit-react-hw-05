import { Link, useLocation } from 'react-router-dom';
import css from './MoviesGallery.module.css'

export default function MoviesGallery({movies}) {
    const location = useLocation()
    return(
        <div>
            <ul className={css.gallery}>
                {movies.map((movie) =>{
                    const trimmedOverview = movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview;
                    return (
                        <li key={movie.id} className={css.item}>
                        <Link to={`/movies/${movie.id}`} state={location}>
                           <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} />
                           <h2 className={css.title}>{movie.title}</h2>
                           <p className={css.text}>{trimmedOverview}</p>
                        </Link>
                    </li>
                    )
                }
                    
                   
                )}
            </ul>
        </div>
    )
}