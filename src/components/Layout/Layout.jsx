import { Suspense } from 'react';
import Navigation from '../Navigation/Navigation';
import css from './Layout.module.css';

export default function Layout({ children }) {
    return (
        <div className='css.container'>
          <header className={css.header}>
            <Navigation />
          </header>
          <div className={css.content}>
            <Suspense fallback={<div><p>Please wait loading page...</p></div>}>
              {children}
            </Suspense>
          </div>
        </div>
    )
}