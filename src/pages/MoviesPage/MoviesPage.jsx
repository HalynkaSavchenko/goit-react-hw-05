import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getDataByQuery } from '../../tmbd-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';



export default function MoviesPage() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const notifyNoResults = () => toast ('Наразі нічого не знайдено. Спробуйте інші критерії пошуку.', {
        duration: 4000, 
        position: 'top-right',
        style: {
            borderRadius: '12px',
            background: '#3339',
            color: '#fff',
        },
        icon: '👏'
    });

    useEffect(() => {
        async function getMoviesByQuery () {
            if (searchParams.get('query') !== null) {
                try {
                    setError(false);
                    setLoader(true);
                    const response = await getDataByQuery(searchParams.get('query'));
                    if (response.data.results.length === 0) {
                        notifyNoResults();
                      }
                    setMovies(response.data.results)
                } catch (error) {
                    setError(true)
                } finally {
                    setLoader(false)
                }
            }
        }
        getMoviesByQuery()
    },[searchParams])

    const handleSearch = (query) => {
        searchParams.set('query', query);
        setSearchParams(searchParams);
    }
    
    return (
        <div>
            <SearchBar onSearch={handleSearch}/>
            {error && <ErrorMessage/>}
            {loader && <Loader/>}
            <MoviesGallery movies={movies}/>
            <Toaster/>
        </div>
    )
}