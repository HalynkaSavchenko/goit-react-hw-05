import { useState, useEffect } from 'react'
import {getData} from '../../tmbd-api'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader'
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery';
import LoadMore from '../../components/LoadMore/LoadMore'

export default function HomePage() {
    const [movies, setMovies] = useState([]); 
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [showBtn, setShowBtn] = useState(false)

    const handleLoadMore = () => {
        setPage(page+1)
    }

    useEffect(() => {
        async function getFilms() {
            try {
                setError(false);
                setLoader(true);
                const response = await getData(page);
                setMovies(response.data.results);
                // setMovies((prevMovies)=>
                // {return [...prevMovies, ...response.data.results]}) коли так задаю стан, перша сторінка монтується 2 рази
                console.log(response);
                const totalPages = response.data.total_pages;
                setShowBtn(totalPages && totalPages !==page)
            }
            catch(error) {
                setError(true)
            }
            finally {
                setLoader(false)
            }
        }

        getFilms()
        
    }, [page])

    return (
        <div>
            {error && <ErrorMessage/>}
            <h1>Тижневий хіт-парад: Найбільш популярні фільми за останній тиждень.</h1>
            {movies.length > 0 && <MoviesGallery movies={movies}/>}
            {loader && <Loader/>}
            {showBtn && <LoadMore onClick ={handleLoadMore}/>}
        </div>
    )
}