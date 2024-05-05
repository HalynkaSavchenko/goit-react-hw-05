import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(()=> import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage= lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const Layout = lazy(() => import('../Layout/Layout'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));



export default function App() {
    return (
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/movies' element={<MoviesPage/>}/>
            <Route path='/movies/:movieId' element={<MovieDetailsPage/>}>
              <Route path='cast' element={<MovieCast/>}/>
              <Route path='reviews' element={<MovieReviews/>}/>
            </Route>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </Layout>
    )
}
// 

// 
